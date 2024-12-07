import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
import redisClient from '../utils/redis';
import userUtils from '../utils/user';

class AuthController {
  /**
   * Signs in the user by generating a new authentication token.
   *
   * - Requires the `Authorization` header in the format of Basic Auth:
   *   (Base64 encoded string of `<email>:<password>`).
   * - Verifies the user's email and password (stored as SHA1 hash) against the database.
   * - If the user is not found or credentials are invalid, returns:
   *   { "error": "Unauthorized" } with status 401.
   * - If authenticated:
   *   - Generates a random string token using `uuidv4`.
   *   - Creates a Redis key in the format `auth_<token>` to store the user ID.
   *   - Sets the token to expire after 24 hours.
   *   - Returns the token: { "token": "<generated_token>" } with status 200.
   */
  static async getConnect(request, response) {
    const Authorization = request.header('Authorization') || '';

    const credentials = Authorization.split(' ')[1];

    if (!credentials)
      return response.status(401).send({ error: 'Unauthorized' });

    const decodedCredentials = Buffer.from(credentials, 'base64').toString(
      'utf-8'
    );

    const [email, password] = decodedCredentials.split(':');

    if (!email || !password)
      return response.status(401).send({ error: 'Unauthorized' });

    const sha1Password = sha1(password);

    const user = await userUtils.getUser({
      email,
      password: sha1Password,
    });

    if (!user) return response.status(401).send({ error: 'Unauthorized' });

    const token = uuidv4();
    const key = `auth_${token}`;
    const hoursForExpiration = 24;

    await redisClient.set(key, user._id.toString(), hoursForExpiration * 3600);

    return response.status(200).send({ token });
  }

  /**
   * Signs out the user by invalidating their authentication token.
   *
   * - Retrieves the user's token from the request.
   * - If the token is invalid or user is not found, returns:
   *   { "error": "Unauthorized" } with status 401.
   * - If valid, deletes the token from Redis and returns no content with status 204.
   */
  static async getDisconnect(request, response) {
    const { userId, key } = await userUtils.getUserIdAndKey(request);

    if (!userId) return response.status(401).send({ error: 'Unauthorized' });

    await redisClient.del(key);

    return response.status(204).send();
  }
}

export default AuthController;
