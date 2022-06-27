const router = require('express').Router();
// Use the controller to process requests
const controller = require('../controllers/controller.js');

const { isPrivate } = require('../middlewares/checkAuth'); //requires users to be logged in to access these pages

const Comment = require('../models/Comment.js');
const Post = require('../models/Post.js');
const Profile = require('../models/Profile.js');
const User = require('../models/User.js');

const path = require('path');

router.get('/', isPrivate, async(req, res) => {
  const posts = await Post.find({});
  
  // Load posts from MongoDB query
  res.render('home', {
      posts, 
      pageTitle: 'Home', 
      name: req.session.name,
      layout: 'main'} );
  });

//duplicate route for home
router.get('/home', isPrivate, async(req, res) => {
  const posts = await Post.find({});  
  
  res.render('home', { 
      posts,
      pageTitle: 'Home', 
      name: req.session.name,
      layout: 'main' } );
  });

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
router.post('/submit-post', isPrivate, (req, res) => {
  const {image} = req.files
  image.mv(path.resolve(__dirname, './public/images', image.name), (error) => {
      Post.create({
          ...req.body,
          image: '/images/' + image.name
      },  (error, post) => {
          res.redirect('/');
      })
  });
});

module.exports = router;