const { body } = require('express-validator');

const registrationValidation = [

    // Uname should not be empty
  body('username').not().isEmpty().withMessage("Username is required."),

  // Email should not be empty and must be a valid email
  body('email').not().isEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please provide a valid email."),

  // Password needs to be min 6 chars
  body('password').isStrongPassword().withMessage("Password must be at least 8 characters long, and a combination of upper and lowercase characters, numbers and symbols.")
        .isLength({max: 15}).withMessage("Password must not exceed 16 characters"),

  // Confirm Password needs to be min 6 chars AND must match the req.body.password field
  body('confirmPass').isStrongPassword().withMessage("Password must be at least 8 characters long, and a combination of upper and lowercase characters, numbers and symbols.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match.");
      }
      return true;
    })
]

module.exports = { registrationValidation };