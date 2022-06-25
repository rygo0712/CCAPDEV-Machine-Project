const db = require('../models/db.js');
const User = require('../models/User.js');

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


exports.registerUser = (req, res) => {
  // 1. Validate request

  // 2. If VALID, find if email exists in users
  //      NEW USER (no results retrieved)
  //        a. Hash password
  //        b. Create user
  //        c. Redirect to login page
  //      EXISTING USER (match retrieved)
  //        a. Redirect user to login page with error message.

  // 3. If INVALID, redirect to register page with errors
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { username, email, password } = req.body;

    User.getOne({ username: username }, (err, result) => {
      if (result) {
        console.log(result);
        // found a match, return to login with error
        req.flash('error_msg', 'Username already exists.');
        res.redirect('/signup');
      } else {
        // no match, create user (next step)
        // for now we redirect to the login with no error.
        const saltRounds = 10;

        // Hash password
        bcrypt.hash(password, saltRounds, (err, hashed) => {
          const newUser = {
            username,
            email,
            password: hashed
          };

          User.create(newUser, (err, user) => {
            if (err) {
              req.flash('error_msg', 'Could not create user. Please try again.');
              res.redirect('/signup');
              // res.status(500).send({ message: "Could not create user"});
            } else {
              req.flash('success_msg', 'You are now registered! Ypu may now login above.');
              res.redirect('/login');
            }
          });
        });
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);

    req.flash('error_msg', messages.join(' '));
    res.redirect('/signup');
  }
};

exports.loginUser = (req, res) => {
  // 1. Validate request

  // 2. If VALID, find if email exists in users
  //      EXISTING USER (match retrieved)
  //        a. Check if password matches hashed password in database
  //        b. If MATCH, save info to session and redirect to home
  //        c. If NOT equal, redirect to login page with error
  //      UNREGISTERED USER (no results retrieved)
  //        a. Redirect to login page with error message

  // 3. If INVALID, redirect to login page with errors
  res.redirect('/');
};

exports.logoutUser = (req, res) => {
  // Destroy the session and redirect to login page
  res.redirect('/login');
};

//module.exports = userController;
