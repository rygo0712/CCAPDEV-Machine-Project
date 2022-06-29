const db = require('../models/db.js');
const Post = require('../models/Post.js');
const Profile = require('../models/Profile.js');
const Comment = require('../models/Comment.js');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

const homeController = {
    //to submit a post
    submitPost: (req, res) => {
        if(req.files != null){
            const image = req.files.imageContent
            //console.log(image);
            let newname = uuidv1() + path.extname(image.name);
            fs.stat('./public/images/' + newname, function(err, data){
                if(err){
                    image.name = newname;
                }
            });
                
                
            //console.log(req.files.imageContent)
            //console.log(path.resolve('./public/images', newname));
            image.mv(path.resolve('./public/images', newname), (error) => {
                Post.create({
                    title: req.body.title,
                    textContent: req.body.textContent,
                    imageContent: '/images/' + newname,
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
        console.log("submitComment req.body._id: " + req.body._id);
        if (req.files != null){
            const image = req.files.imageContent
            //console.log(req.files.imageContent)
            //console.log(path.resolve('./public/images', image.name));
            let newname = uuidv1() + path.extname(image.name);
            fs.stat('./public/images/' + newname, function(err, data){
                if(err){
                    image.name = newname;
                }
            });
            image.mv(path.resolve('./public/images', newname), (error) => {
                Comment.create({
                    textContent: req.body.textContent,
                    imageContent: '/images/' + newname,
                    username: req.session.username,
                    postid: req.body._id
                }, (error, comment) => {
                    //console.log("on submitting comment req.body._id: " + req.body._id);
                    var passingId = req.body._id.split(",");
                    res.redirect('/view-post?_id=' + passingId[0]);
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

            });
        }
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
