const router = require('express').Router();
const userController = require('../controllers/userController');
const { registrationValidation } = require('../validators.js');

// GET login to display login page
router.get('/login',(req, res) => {
  res.render('login', {
    pageTitle: 'Login',
  });
});

// GET register to display registration page
router.get('/signup-post', (req, res) => {
  res.render('signup', {
    pageTitle: 'Registration',
  });
});

// POST methods for form submissions
router.post('/register', registrationValidation, userController.registerUser);
router.post('/login', userController.loginUser);

// logout
router.get('/logout', userController.logoutUser);

module.exports = router;