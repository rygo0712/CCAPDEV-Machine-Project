const db = require('../models/db.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const Profile = require('../models/Profile.js');
const User = require('../models/User.js');

const moment = require('moment');
var path = require('path');
const { cp } = require('fs');

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
        db.findOne(Profile, { username: req.session.username }, '', (header) =>{ //profile pic query
            res.render('view_profile', { 
                username: req.session.username,
                profileImg: header.profileImg,
                faveCharImg: header.faveCharImg,
                bio: header.bio,
                faveQuote: header.faveQuote,
                pageTitle: 'View Profile', 
                name: req.session.name,
                layout: 'main' 
            });
        })
    },

    // Display edit profile page
    getEditProfile: (req, res) => {
        db.findOne(Profile, { username: req.session.username }, '', (header) =>{ //profile pic query
            res.render('edit_profile', { 
                username: req.session.username,
                profileImg: header.profileImg,
                faveCharImg: header.faveCharImg,
                bio: header.bio,
                faveQuote: header.faveQuote,
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
            //console.log(post);
            post = post.toJSON();
            post.postingTime = moment(post.postingTime).fromNow();
            db.findMany(Comment, {postid: req.query._id}, '', function (comments){
                db.updateOne(Post, {_id: req.query._id}, { $set: {numComments: comments.length} }, (err, res) => {
                    //console.log(res)
                }) //updates number of comments
                comments = comments.map(comments => comments.toJSON());
                comments.forEach(element => {
                    element.postingTime = moment(element.postingTime).fromNow();
                });
                comments = comments.reverse();
                db.findOne(Profile, { username: req.session.username }, 'profileImg', (header) =>{ //profile pic query
                    res.render('view_post', { 
                        post,
                        comments,
                        username: req.session.username,
                        profileImg: header.profileImg,
                        pageTitle: 'View Post', 
                        name: req.session.name,
                        layout: 'main', 
                        _id: req.query._id
                    });
                }) 
            })
 
        })
    },

    likePost: (req, res) => {
        console.log('id: ' + req.query._id);
        db.findOne(Post, {_id: req.query._id}, '', function(post) {
            console.log('return ' + post);
        });
        db.updateOne(Post, {_id: req.query._id}, { $push: {likesBy: req.session.username} }, (err, res) => {
            console.log(err);
        });
    }

}

module.exports = controller;
/*
db.findMany(Comment, {postid: post._id}, '', function (comments){
    //console.log(comments)
    comments = comments.map(comments => comments.toJSON());
    comments.forEach(element => {
        element.postTime = moment(element.postTime).fromNow();
    })
console.log(post);
    db.findOne(Profile, { username: req.session.username }, 'profileImg', (header) =>{ //profile pic query
        res.render('view_post', { 
            post,
            comments,
            username: req.session.username,
            profileImg: header.profileImg,
            pageTitle: 'View Post', 
            name: req.session.name,
            layout: 'main' 
        });
    })
}) */
