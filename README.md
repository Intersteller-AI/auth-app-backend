# Project Setup and Running Guide

This document provides detailed steps on how to set up and run the `auth-app-backend` project.

## Prerequisites

Before you begin, ensure you have the following software installed on your machine:

1. **Node.js**: Download and install the latest version from [Node.js official website](https://nodejs.org/).
2. **npm**: npm is included with Node.js, so installing Node.js will also install npm.

## Project Setup

Follow these steps to set up the project:

### Step 1: Clone the Repository

If you haven't already, clone the repository from GitHub (replace `<repository-url>` with your actual repository URL):

```bash
git clone <repository-url>
```

### Step 2: Navigate to the Project Directory

Change to the project's root directory:

```bash
cd backend
```

### Step 3: Install Dependencies

Install the project's dependencies using npm:

```bash
npm install
```

This command will install all the packages listed in the `dependencies` section of the `package.json` file.

### Step 4: Configure Environment Variables

Create a `.env` file in the root directory of the project and add the necessary environment variables. For example:

```bash
touch .env
```

Add the following lines to the `.env` file (modify the values as needed):

```
PORT=8000
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=your_database_url
```

## Running the Project

### Step 1: Start the Development Server

To start the development server with `nodemon` (which automatically restarts the server when file changes are detected), run:

```bash
npm run dev
```

### Step 2: Start the Production Server

To start the server in production mode, run:

```bash
npm start
```

### Step 3: Verify the Server is Running

Open your web browser or an API client like Postman and navigate to:

```
http://localhost:8000
```

You should see a JSON response indicating that the server is started:

```json
{
  "message": "server is started"
}
```

## Project Structure

The basic project structure is as follows:

```
backend/
├── node_modules/      # Installed npm packages
├── routes/            # Directory containing route files (e.g., auth.routes.js)
├── .env               # Environment variables file
├── package.json       # Project metadata and dependencies
├── server.js          # Main server file
└── README.md          # Documentation file (this file)
```

## Additional Notes

- **CORS Configuration**: The server is configured to accept requests from `http://localhost:3000` and allows credentials (cookies) to be sent with requests.
- **Cookie Parser**: The `cookie-parser` middleware is used to parse cookies attached to the client request object.
- **Body Parsing**: The server uses `express.json()` and `express.urlencoded()` to parse incoming request bodies with JSON and URL-encoded data.
- **Authentication Routes**: The project includes routes for authentication under `/api/users`.

### Example of `server.js` File

For reference, here is an example of how your `server.js` file should look:

```javascript
const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.get("/", (req, res, next) => {
  res.json({
    message: "server is started",
  });
});

app.use("/api/users", authRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`server is started on http://localhost:${process.env.PORT || 8000}`);
});
```

By following these instructions, you should be able to set up and run the `backend` project successfully.
