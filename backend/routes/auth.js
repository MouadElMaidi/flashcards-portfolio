const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

// PUT /auth/signup
router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          return Promise.reject("E-Mail address already exists!");
        }
        return user;
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("username").trim().not().isEmpty(),
  ],
  authController.signup
);

// POST /auth/login
router.post("/login", authController.login);

module.exports = router;
