import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

function controllerRouting(app) {
  const router = express.Router();
  app.use('/', router);

  // App Controller Routes

  // Returns the status of Redis and the database (DB)
  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  // Provides the count of users and files in the database
  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });

  // User Controller Routes

  // Creates a new user in the database
  router.post('/users', (req, res) => {
    UsersController.postNew(req, res);
  });

  // Retrieves the authenticated user based on the provided token
  router.get('/users/me', (req, res) => {
    UsersController.getMe(req, res);
  });

  // Auth Controller Routes

  // Signs in a user and generates a new authentication token
  router.get('/connect', (req, res) => {
    AuthController.getConnect(req, res);
  });

  // Signs out a user using the provided token
  router.get('/disconnect', (req, res) => {
    AuthController.getDisconnect(req, res);
  });

  // Files Controller Routes

  // Creates a new file in the database and stores it on disk
  router.post('/files', (req, res) => {
    FilesController.postUpload(req, res);
  });

  // Retrieves a file document by its ID
  router.get('/files/:id', (req, res) => {
    FilesController.getShow(req, res);
  });

  // Retrieves all file documents for a specific parent ID with pagination
  router.get('/files', (req, res) => {
    FilesController.getIndex(req, res);
  });

  // Sets the file's `isPublic` attribute to true based on its ID
  router.put('/files/:id/publish', (req, res) => {
    FilesController.putPublish(req, res);
  });

  // Sets the file's `isPublic` attribute to false based on its ID
  router.put('/files/:id/unpublish', (req, res) => {
    FilesController.putUnpublish(req, res);
  });

  // Returns the content of a file document based on its ID
  router.get('/files/:id/data', (req, res) => {
    FilesController.getFile(req, res);
  });
}

export default controllerRouting;
