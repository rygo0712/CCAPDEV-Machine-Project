const db = require('../models/db.js');
const Post = require('../models/Post.js');
const Profile = require('../models/Profile.js');
const Comment = require('../models/Comment.js');
const User = require('../models/User.js');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
const { profile } = require('console');

const homeController = {
    //to submit a post
    submitPost: (req, res) => {
        
        if (req.body.title == '')
        {
            req.flash('error_msg', 'Title must not be empty.');
            res.redirect('/');
        }
        else
        {
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
                        //console.log("on post creation: " + post._id);
                        res.redirect('/');
                    })
                });
            } 
            else{
                Post.create({
                    title: req.body.title,
                    textContent: req.body.textContent,
                    username: req.session.username,
                },  (error, post) => {
                    //console.log("on post creation: " + post._id);
                    res.redirect('/');
                })
            }

        }
    },

    //submit a comment for the post
    
    submitComment: (req, res) => {
        //console.log("submitComment req.body._id: " + req.body._id);
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
                    //var passingId = req.body._id.split(",");
                    res.redirect('/view-post?_id=' + req.body._id);
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
            //req.session.destroy();
            db.findOne(Profile, { username: req.session.username }, '', (header) =>{ //profile pic query
                res.render('home', { 
                    posts,
                    username: req.session.username,
                    headerProfileImg: header.profileImg,
                    pageTitle: 'Home', 
                    name: req.session.name,
                    layout: 'main' } );
            })
            //console.log(posts);
    });
    },
    



    

    editProfile: (req, res) => {
        //console.log('profimg' + req.files.profileImg )
        //console.log('charimg' + req.files.faveCharImg )
        try {
            console.log(req.files.profileImg)
            const profImg = req.files.profileImg
            let newname = uuidv4() + path.extname(profImg.name)
            profImg.mv(path.resolve('./public/images', newname), (error) =>{
                db.updateOne(Profile, {username: req.session.username }, {$set: {profileImg: '/images/' + newname}}, (err, res) => {
                    console.log(res)
                }); 
            })

        }
        catch (e) {
            console.log('error 1 is' + e)
        }

        try{
            console.log(req.files.faveCharImg)
            const CharImg = req.files.faveCharImg
            let newname2 = uuidv4() + path.extname(CharImg.name)
            CharImg.mv(path.resolve('./public/images', newname2), (error) =>{
                db.updateOne(Profile, {username: req.session.username }, {$set: {faveCharImg: '/images/' + newname2}}, (err, res) => {
                    console.log(res)
                }); 
            })
        }
        catch (e){
            console.log('error 1 is' + e)
        }

        db.updateOne(Profile, {username: req.session.username }, {$set: {faveQuote: req.body.faveQuote, bio: req.body.bio}}, (err, res) => {
            console.log(res)
        }); 
       
        res.redirect('/view-profile?username=' + req.session.username)
    },

    editPost: (req, res) => {
        try {
            const newImg = req.files.imageContent;
            let newname = uuidv1() + path.extname(newImg.name);
            newImg.name = newname;
         
            newImg.mv(path.resolve('./public/images', newname), (error) =>{
                db.updateOne(Post, {_id: req.body._id }, {$set: {imageContent: '/images/' + newname}}, (err, res) => {
                    console.log(res)
                }); 
            });

        }
        catch (e) {
            
        }

        db.updateOne(Post, {_id: req.body._id }, {$set: {textContent: req.body.textContent}}, (err, res) => {
            console.log(res);
        }); 

        res.redirect('/view-post?_id=' + req.body._id);
    },

    editComment: (req, res) => {
        try{
            const newImg = req.files.imageContent;
            let newname = uuidv1() + path.extname(newImg.name);
            newImg.name = newname;

            newImg.mv(path.resolve('./public/images', newname), (error) => {
                db.updateOne(Comment, {_id: req.body._id}, {$set: {imageContent: '/images/' + newname}}, (err, res) => {

                });
            });
        }
        catch(e){

        }
        db.updateOne(Comment, {_id: req.body._id}, {$set: {textContent: req.body.textContent}}, (err, res) => {

        });

        db.findOne(Comment, {_id: req.body._id}, '', (commentresult)=> {
            res.redirect('/view-post?_id=' + commentresult.postid);
        }) 
    },


    deletePost: (req, res) => {
        
        console.log("homeController deletePost req.query._id: " + req.query._id);
        db.deleteOne(Post, {_id: req.query._id}, (result) => {
            db.deleteMany(Comment, {postid: req.query._id}, (comment_result) => {
                console.log('Comment deletion: ' + comment_result);
            })
            // it wont redirect home idk why
            //res.redirect('/home');
        });
    },

    deleteComment: (req, res) => {
        
        console.log("homeController deleteComment req.query._id: " + req.query._id);
        db.deleteOne(Comment, {_id: req.query._id}, (result) => {
            // it wont redirect home idk why
            //res.redirect('/home');
        });
    },

    deleteProfile: (req, res) => {
        User.deleteOne(req.session.username, (deleteUser) => {

        });
        db.deleteOne(Profile, {username: req.session.username}, (deleteProfile) => {

        });
        db.deleteMany(Post, {username: req.session.username}, (deletePost) => {
            
        });
        db.deleteMany(Comment, {username: req.session.username}, (deleteComment) => {

        });
        
        // Removing the user's likes from all posts and comments in the db
        db.findMany(Post, {}, '', function(posts) {
            posts.forEach(element => {
                db.updateOne(Post, {_id: element._id}, {$pull: {likesBy: req.session.username}}, (err, res) => {}
                );
            });
        });

        db.findMany(Comment, {}, '', function(comments) {
            comments.forEach(element => {
                db.updateOne(Comment, {_id: element._id}, {$pull: {likesBy: req.session.username}}, (err, res) => {}
                );
            });
        });

        /* COMMENTED OUT: updateMany causing callback errors
        db.updateMany(Post, 
            {}, 
            {$pull: {likesBy: req.session.username} }, 
            {multi: true},
            (err, res) => {}
        );

        db.updateMany(Comment, 
            {}, 
            {$pull: {likesBy: req.session.username} }, 
            {multi: true},
            (err, res) => {}
        );
        */
        // Updating numComments of each post
        db.findMany(Post, {}, '', function(posts) {
            posts.forEach(element => {
                db.findMany(Comment, {postid: element._id}, '', function(comments) {
                    db.updateOne(Post, {_id: element._id}, {$set: {numComments: comments.length}},{multi: true}, (err, res) => {}
                    );
                })
            });
       });

        // Clearing the current session 
        if (req.session) {
            req.session.destroy(() => {
              res.clearCookie('connect.sid');
            });
          }
    }
}

module.exports = homeController;
