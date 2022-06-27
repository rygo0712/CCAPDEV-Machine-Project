const router = require('express').Router();
// Use the controller to process requests
const controller = require('../controllers/controller.js');
const homeController = require('../controllers/homeController.js')

const { isPrivate } = require('../middlewares/checkAuth'); //requires users to be logged in to access these pages

const Comment = require('../models/Comment.js');
const Post = require('../models/Post.js');
const Profile = require('../models/Profile.js');
const User = require('../models/User.js');


const path = require('path');

router.get('/', isPrivate, homeController.getPosts);

//duplicate route for home
router.get('/home', isPrivate, homeController.getPosts);

router.get('/view-profile', isPrivate, (req, res) => {
    res.render('view_profile', { 
      pageTitle: 'View Profile', 
      name: req.session.name,
      layout: 'main' } );
  });

router.get('/edit-profile', isPrivate, (req, res) => {
    res.render('edit_profile', { 
      pageTitle: 'Edit Profile', 
      name: req.session.name,
      layout: 'main' } );
  });

router.get('/view-post', isPrivate, (req, res) => {
  res.render('view_post', { 
    pageTitle: 'View Post', 
    name: req.session.name,
    layout: 'main' } );
  });

// Request received when user creates a post in the home page
router.post('/submit-post', isPrivate, homeController.submitPost);

module.exports = router;