const db = require('../models/db.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const Profile = require('../models/Profile.js');
const User = require('../models/User.js');

const moment = require('moment');
var path = require('path');

const controller = {

    // Display login page after receiving request from auth.js
    getLogin: (req, res) => {
        res.render('login', {
            pageTitle: 'Login',
            layout: 'index'
          });
    },

    // Display signup page after receiving request from auth.js
    getSignup: (req, res) => {
        res.render('signup', {
            pageTitle: 'Registration',
            layout: 'index'
        });
    },

    // Display home page
    getHome: async(req, res) => {
        const posts = await Post.find({});
        
        // Load posts from MongoDB query
        res.render('home', {
            posts, 
            pageTitle: 'Home', 
            name: req.session.name,
            layout: 'main'
        });
    },

    // Display view profile page
    getViewProfile: (req, res) => {
        db.findOne(Profile, { username: req.session.username }, 'profileImg', (header) =>{ //profile pic query
            res.render('view_profile', { 
                username: req.session.username,
                profileImg: header.profileImg,
                pageTitle: 'View Profile', 
                name: req.session.name,
                layout: 'main' 
            });
        })
    },

    // Display edit profile page
    getEditProfile: (req, res) => {
        db.findOne(Profile, { username: req.session.username }, 'profileImg', (header) =>{ //profile pic query
            res.render('edit_profile', { 
                username: req.session.username,
                profileImg: header.profileImg,
                pageTitle: 'Edit Profile', 
                name: req.session.name,
                layout: 'main' 
            });
        })
    },

    getViewPost: (req, res) => {
        // not sure how to search for the specific post and comments
        // should pass a post and comment[] to the render function
        db.findOne(Post, {_id: req.query._id}, '', function (post){
            console.log(post);
            post = post.toJSON();
            post.postingTime = moment(post.postingTime).fromNow();
            console.log(post);
            db.findOne(Profile, { username: req.session.username }, 'profileImg', (header) =>{ //profile pic query
                res.render('view_post', { 
                    post,
                    username: req.session.username,
                    profileImg: header.profileImg,
                    pageTitle: 'View Post', 
                    name: req.session.name,
                    layout: 'main' 
                });
            })
        })
    }

}

module.exports = controller;
