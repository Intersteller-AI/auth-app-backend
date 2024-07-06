// @ts-nocheck
const { sign } = require("jsonwebtoken");
const { users } = require("../config/db");
const { AUTH_SECRET } = process.env;

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user in the users array by email
    const user = users.find((user) => user.email === email);

    // If user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({
        message: "User does not exist. Please create your account.",
        success: false,
        error: true,
      });
    }

    // Check if the provided password matches the user's password
    if (password === user.password) {
      const jwt = await sign(
        {
          id: user.id,
        },
        AUTH_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // Destructure user to exclude id and password from the response
      const { id, password, ...userRes } = user;

      // Set the JWT as a cookie and send the response
      return res
        .status(200)
        .cookie("token", jwt, {
          exp: new Date(Date.now() + 60 * 60 * 1000), // Set the expiration date to 1 hour from now
          sameSite: "none", // Allow the cookie to be sent in cross-site requests
          secure: true, // Ensure the cookie is only sent over HTTPS
          httpOnly: true, // Make the cookie inaccessible to JavaScript (helps mitigate XSS attacks)
        })
        .json({
          user: userRes,
          message: "User authenticated",
          success: true,
          error: false,
        });
    } else {
      res.status(401).json({
        message: "Not authenticated",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = users.find((user) => user.id === req.id);

    // If user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
        error: true,
      });
    }

    res.json({
      message: user,
      success: false,
      error: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signin,
  profile,
};
