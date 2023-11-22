const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  try {
    const hashPw = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: email,
      password: hashPw,
      username: username,
    });

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id.toString(),
      },
      "secretjwtsignature"
    );

    res.status(201).json({
      user: {
        email: user.email,
        username: user.username,
        token: token,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser.id.toString(),
      },
      "secretjwtsignature"
    );

    res.status(201).json({
      user: {
        email: loadedUser.email,
        username: loadedUser.username,
        token: token,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
