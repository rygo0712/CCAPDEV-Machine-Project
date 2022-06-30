const router = require('express').Router();
// Use the controller to process requests
const controller = require('../controllers/controller.js');
const homeController = require('../controllers/homeController.js')

const { isPrivate } = require('../middlewares/checkAuth'); //requires users to be logged in to access these pages

const { postValidation } = require('../validators.js');

const Comment = require('../models/Comment.js');
const Post = require('../models/Post.js');
const Profile = require('../models/Profile.js');
const User = require('../models/User.js');


const path = require('path');


router.get('/', isPrivate, homeController.getPosts);

//duplicate route for home
router.get('/home', isPrivate, homeController.getPosts);


router.get('/view-profile', isPrivate, controller.getViewProfile);

router.get('/edit-profile', isPrivate, controller.getEditProfile);

router.get('/view-post', isPrivate, controller.getViewPost);

router.get('/like-post', isPrivate, controller.likePost);

router.get('/like-comment', isPrivate, controller.likeComment);

// Request received when user creates a post in the home page
router.post('/submit-post', isPrivate, homeController.submitPost);

//Request revie
router.post('/comment-post', isPrivate, homeController.submitComment);

router.post('/save-editprofile', isPrivate, homeController.editProfile); 

router.post('/save-editpost', isPrivate, homeController.editPost);

module.exports = router;