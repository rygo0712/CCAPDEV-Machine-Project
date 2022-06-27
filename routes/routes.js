const router = require('express').Router();
// Use the controller to process requests
const controller = require('../controllers/controller.js');

const { isPrivate } = require('../middlewares/checkAuth'); //requires users to be logged in to access these pages

const Comment = require('../models/Comment.js');
const Post = require('../models/Post.js');
const Profile = require('../models/Profile.js');
const User = require('../models/User.js');

const path = require('path');

router.get('/', isPrivate, controller.getHome);

//duplicate route for home
router.get('/home', isPrivate, controller.getHome);

router.get('/view-profile', isPrivate, controller.getViewProfile);

router.get('/edit-profile', isPrivate, controller.getEditProfile);

router.get('/view-post', isPrivate, controller.getViewPost);

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