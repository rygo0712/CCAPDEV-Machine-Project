const db = require('../models/db.js');
const User = require('../models/User.js');

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


exports.registerUser = (req, res) => {
  // 1. Validate request

  // 2. If VALID, find if username exists in users
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
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const {
      username,
      password
    } = req.body;

    // Next items go here... Same as before, this will be replaced.
    User.getOne({ username: username }, (err, user) => {
      if (err) {
        // Database error occurred...
        req.flash('error_msg', 'Something happened! Please try again.');
        res.redirect('/login');
      } else {
        // Successful query
        if (user) {
          // User found!
  
          // Check password with hashed value in the database
          bcrypt.compare(password, user.password, (err, result) => {
            // passwords match (result == true)
            if (result) {
              // Update session object once matched!
              req.session.user = user._id;
              req.session.username = user.username;

              console.log(req.session);

              res.redirect('/');
            } else {
              // passwords don't match
              req.flash('error_msg', 'Incorrect password. Please try again.');
              res.redirect('/login');
            }
          });
        } else {
          // No user found
          req.flash('error_msg', 'No registered user with that username. Create a new account by clicking the link above.');
          res.redirect('/login');
        }
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);

    req.flash('error_msg', messages.join(' '));
    res.redirect('/login');
  }
};

exports.logoutUser = (req, res) => {
  // Destroy the session and redirect to login page
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  }
};

//module.exports = userController;
