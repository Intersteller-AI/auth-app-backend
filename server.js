const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware to parse JSON payloads
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to enable CORS with specific configuration
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Define a simple route for the root URL
app.get("/", (req, res, next) => {
  res.json({
    message: "server is started",
    success: true,
    error: false,
  });
});

// Use the authentication routes under the /api/users path
app.use("/api/users", authRoutes);

// Start the server on port 8000
app.listen(8000, () => {
  console.log(`server is started on http://localhost:8000`);
});
