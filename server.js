import express from 'express';
import controllerRouting from './routes/index';

/**
 * This project serves as a comprehensive summary of various back-end concepts, 
 * including authentication, Node.js, MongoDB, Redis, pagination, 
 * and background processing.
 *
 * The goal is to create a simple platform for uploading and viewing files with the following features:
 *
 * - User authentication using tokens
 * - Listing all available files
 * - Uploading new files
 * - Modifying file permissions
 * - Viewing files
 * - Generating thumbnails for image files
 */

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

controllerRouting(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
