# Project Setup and Running Guide

This document provides detailed steps on how to set up and run the `auth-app-backend` project.

## Project Setup

Follow these steps to set up the project:

### Step 1: Clone the Repository

If you haven't already, clone the repository from GitHub (https://github.com/Intersteller-AI/auth-app-backend.git):

```bash
git clone https://github.com/Intersteller-AI/auth-app-backend.git
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

You can add or remove anything from the `.env` file according to your needs.

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
  "message": "server is started",
  "success": true,
  "error": false,
}
```

## Project Structure

The basic project structure is as follows:

```
backend/
├── node_modules/      # Installed npm packages
├── config/            # Directory containing configuration files (e.g., db.js)
├── routes/            # Directory containing route files (e.g., auth.routes.js)
├── controllers/       # Directory containing controllers files for business logic (e.g., auth.controllers.js)
├── .env               # Environment variables file
├── package.json       # Project metadata and dependencies
├── server.js          # Main server file
└── README.md          # Documentation file (this file)
```

By following these instructions, you should be able to set up and run the `backend` project.
