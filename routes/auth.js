const router = require('express').Router();
const userController = require('../controllers/userController');
const { registrationValidation, loginValidation } = require('../validators.js');
const { isPublic, isPrivate } = require('../middlewares/checkAuth');


// GET login to display login page
router.get('/login', isPublic, (req, res) => {
  res.render('index', {
    pageTitle: 'Login',
  });
});

// GET register to display registration page
router.get('/signup', isPublic, (req, res) => {
  res.render('signup', {
    pageTitle: 'Registration',
  });
});

// POST methods for form submissions
router.post('/signup', isPublic, registrationValidation, userController.registerUser);
router.post('/login', isPublic, userController.loginUser, userController.loginUser);

// logout
router.get('/logout', isPrivate, userController.logoutUser);

module.exports = router;