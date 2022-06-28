const db = require('../models/db.js');
const Post = require('../models/Post.js');
const Profile = require('../models/Profile.js');
const Comment = require('../models/Comment.js');
const moment = require('moment');
var path = require('path');

const homeController = {
    //to submit a post
    submitPost: (req, res) => {
        if(req.files != null){const image = req.files.imageContent
            console.log(req.files.imageContent)
            console.log(path.resolve('./public/images', image.name));
            image.mv(path.resolve('./public/images', image.name), (error) => {
                Post.create({
                    title: req.body.title,
                    textContent: req.body.textContent,
                    imageContent: '/images/' + image.name,
                    username: req.session.username
                },  (error, post) => {
                    res.redirect('/');
                })
        });} 
        else{
            Post.create({
                title: req.body.title,
                textContent: req.body.textContent,
                username: req.session.username,
            },  (error, post) => {
                res.redirect('/');
            })
        }

        
      },

    //submit a comment for the post
    
    submitComment: (req, res) => {
        if (req.files != null){const image = req.files.imageContent
        console.log(req.files.imageContent)
        console.log(path.resolve('./public/images', image.name));
        image.mv(path.resolve('./public/images', image.name), (error) => {
            Comment.create({
                textContent: req.body.textContent,
                imageContent: '/images/' + image.name,
                username: req.session.username,
                postid: req.body._id
            }, (error, comment) => {
                res.redirect('/view-post?_id=' + req.body._id)
                /*res.render('view_post', { 
                    post,
                    comments,
                    username: req.session.username,
                    profileImg: header.profileImg,
                    pageTitle: 'View Post', 
                    name: req.session.name,
                    layout: 'main' 
                });*/
            })

        });}
        else{
            Comment.create({
                textContent: req.body.textContent,
                username: req.session.username,
                postid: req.body._id
            }, (error,comment) => {
                res.redirect('/view-post?_id=' + req.body._id)
                //res.redirect('/view-post?_id=' + req.query._id)
            })
        }
    },

//Antonlouis.123
    getPosts: (req,res) => {
    db.findMany(Post, {}, '', function (posts){
        //console.log(posts);
        posts = posts.map(posts => posts.toJSON()); //formats 'posts' to JSON to remove mongoose schema formatting to edit the date on the next step
        posts.forEach(element => { //uses the moments module to format the date
            element.postingTime = moment(element.postingTime).fromNow();
        });
        posts = posts.reverse();
        db.findOne(Profile, { username: req.session.username }, '', (header) =>{ //profile pic query
            res.render('home', { 
                posts,
                username: req.session.username,
                profileImg: header.profileImg,
                pageTitle: 'Home', 
                name: req.session.name,
                layout: 'main' } );
        })
        //console.log(posts);
    });
    }
    

}

module.exports = homeController;
