// @ts-nocheck
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { users } = require("../config/db");
const { AUTH_SECRET } = process.env;

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email);

    if (!user) {
      res.status(404).json({
        message: "user does not exist",
        success: false,
        error: true,
      });
    }

    if (compare(password, user.password)) {
      const jwt = await sign(
        {
          id: user.id,
        },
        AUTH_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return res
        .status(200)
        .cookie("token", jwt, {
          exp: new Date(Date.now() * 60 * 60 * 1000),
          sameSite: "none",
          secure: true,
          httpOnly: true,
        })
        .json({
          message: "user authenticated",
          success: true,
          error: false,
        });
    } else {
      res.status(401).json({
        message: "not authenticated",
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

    res.json({
      message: "",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signin,
  profile,
};
