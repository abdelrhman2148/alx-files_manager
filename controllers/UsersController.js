import { ObjectId } from 'mongodb';
import sha1 from 'sha1';
import Queue from 'bull';
import dbClient from '../utils/db';
import userUtils from '../utils/user';

const userQueue = new Queue('userQueue');

class UsersController {
  /**
   * Handles the creation of a new user with an email and password.
   *
   * - If the email is missing, returns: { "error": "Missing email" } with status 400.
   * - If the password is missing, returns: { "error": "Missing password" } with status 400.
   * - If the email already exists in the database, returns: { "error": "Already exist" } with status 400.
   * - The password is hashed using SHA1 before being stored.
   * - Saves the new user in the `users` collection with the structure:
   *   { email: <email>, password: <hashed_password> }.
   * - Returns the created user with only the `id` and `email`:
   *   { id: <MongoDB_generated_id>, email: <email> } with status 201.
   * - Adds the new user to the `userQueue` for background processing.
   */
  static async postNew(request, response) {
    const { email, password } = request.body;

    if (!email) return response.status(400).send({ error: 'Missing email' });

    if (!password)
      return response.status(400).send({ error: 'Missing password' });

    const emailExists = await dbClient.usersCollection.findOne({ email });

    if (emailExists)
      return response.status(400).send({ error: 'Already exist' });

    const sha1Password = sha1(password);

    let result;
    try {
      result = await dbClient.usersCollection.insertOne({
        email,
        password: sha1Password,
      });
    } catch (err) {
      await userQueue.add({});
      return response.status(500).send({ error: 'Error creating user' });
    }

    const user = {
      id: result.insertedId,
      email,
    };

    await userQueue.add({
      userId: result.insertedId.toString(),
    });

    return response.status(201).send(user);
  }

  /**
   * Retrieves the authenticated user's details based on the provided token.
   *
   * - If the user is not found, returns: { "error": "Unauthorized" } with status 401.
   * - If found, returns the user's details (email and id only):
   *   { id: <MongoDB_generated_id>, email: <email> } with status 200.
   */
  static async getMe(request, response) {
    const { userId } = await userUtils.getUserIdAndKey(request);

    const user = await userUtils.getUser({
      _id: ObjectId(userId),
    });

    if (!user) return response.status(401).send({ error: 'Unauthorized' });

    const processedUser = { id: user._id, ...user };
    delete processedUser._id;
    delete processedUser.password;

    return response.status(200).send(processedUser);
  }
}

export default UsersController;
