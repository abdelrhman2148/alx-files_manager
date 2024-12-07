# Files Manager - README

## Overview

The **Files Manager** project is a back-end service that demonstrates key back-end concepts, including authentication, Node.js, MongoDB, Redis, pagination, and background processing. The goal is to build a platform for file management, enabling users to upload, view, and manipulate files with ease.

This project was created as part of the ALX Software Engineering program and integrates modern technologies like Redis for caching, MongoDB for data storage, and Bull for background jobs.

---

## Features

1. **User Management**
   - Register new users.
   - User authentication via token-based authentication.
   - Retrieve user details.

2. **File Management**
   - Upload files (text, images, folders).
   - Generate thumbnails for image files (background processing).
   - List files with pagination.
   - Change file permissions (public/private).
   - Retrieve file content.

3. **Background Processing**
   - Asynchronous job handling for:
     - Generating image thumbnails.
     - Sending welcome emails to new users.

4. **Data Storage**
   - MongoDB for persistent user and file data storage.
   - Redis for caching and session management.

---

## Learning Objectives

By the end of this project, you will understand:
- How to build an API using Express.js.
- How to authenticate users securely.
- How to integrate MongoDB for data persistence.
- How to use Redis for caching and session handling.
- How to implement background workers using Bull.

---

## Requirements

- **System**: Ubuntu 18.04 LTS
- **Node.js Version**: 12.x.x
- **Code Standards**: 
  - ESLint for linting
  - JS extension
- **Environment Variables**:
  - `PORT`: Server port (default: `5000`)
  - `DB_HOST`, `DB_PORT`, `DB_DATABASE`: MongoDB configuration
  - `REDIS_HOST`, `REDIS_PORT`: Redis configuration
  - `FOLDER_PATH`: Directory for storing files (default: `/tmp/files_manager`)

---

## Project Structure

```
project-root/
│
├── utils/                # Utility classes for MongoDB, Redis, and others.
├── routes/               # API endpoint definitions.
├── controllers/          # Controller logic for API requests.
├── worker.js             # Background job processors using Bull.
├── server.js             # Main entry point for the Express server.
├── tests/                # Unit and integration tests.
├── .eslintrc.js          # ESLint configuration.
├── babel.config.js       # Babel configuration.
├── package.json          # Node.js dependencies and scripts.
└── README.md             # Project documentation.
```

---

## Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/<your-repo>/alx-files_manager.git
   cd alx-files_manager
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file with the necessary variables:
   ```plaintext
   PORT=5000
   DB_HOST=localhost
   DB_PORT=27017
   DB_DATABASE=files_manager
   REDIS_HOST=localhost
   REDIS_PORT=6379
   FOLDER_PATH=/tmp/files_manager
   ```

4. **Start the Server**
   ```bash
   npm run start-server
   ```

5. **Start Background Workers**
   ```bash
   npm run start-worker
   ```

---

## Usage

### **API Endpoints**

#### Authentication
- **POST /users**: Register a new user.
- **GET /connect**: Authenticate a user and retrieve a token.
- **GET /disconnect**: Log out a user.

#### File Management
- **POST /files**: Upload a new file.
- **GET /files/:id**: Retrieve file details by ID.
- **GET /files**: List files with pagination.
- **PUT /files/:id/publish**: Make a file public.
- **PUT /files/:id/unpublish**: Make a file private.
- **GET /files/:id/data**: Retrieve file content (supports image thumbnail sizes).

---

## Background Workers

1. **File Thumbnails**:
   - Generates thumbnails of sizes `500px`, `250px`, and `100px` for uploaded images.
   - Stored alongside the original file.

2. **Welcome Emails**:
   - Sends a welcome message for new user registrations.

---

## Testing

Run tests for API endpoints and utility classes:
```bash
npm test
```

---

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable applications.
- **Express.js**: Fast and minimalistic web framework.
- **MongoDB**: NoSQL database for storing user and file data.
- **Redis**: In-memory data structure store for caching and session management.
- **Bull**: Queue system for background job processing.
- **Image Thumbnail**: Library for generating image thumbnails.

---

## Authors

- **Abdelrhman Fikri**  
  [GitHub](https://github.com/abdelrhman2148) | [LinkedIn](https://linkedin.com/in/abdelrhman-fikri)

---

## Acknowledgements

This project is part of the ALX Software Engineering program and is inspired by real-world file management systems for educational purposes.

---

For detailed API usage, refer to the comments in the source code and unit tests. Contributions and feedback are welcome!
