import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  /**
   * Returns the status of Redis and the database (DB).
   * Utilizes the previously created utils to check their status.
   * Response format: { "redis": true, "db": true }
   * Status code: 200
   */
  static getStatus(request, response) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    response.status(200).send(status);
  }

  /**
   * Provides the total number of users and files in the database.
   * Response format: { "users": <number>, "files": <number> }
   * Status code: 200
   */
  static async getStats(request, response) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    response.status(200).send(stats);
  }
}

export default AppController;
