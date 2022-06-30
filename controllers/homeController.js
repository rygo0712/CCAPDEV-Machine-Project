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
const { profile } = require('console');

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
                    console.log("on post creation: " + post._id);
                    res.redirect('/');
                })
        });} 
        else{
            Post.create({
                title: req.body.title,
                textContent: req.body.textContent,
                username: req.session.username,
            },  (error, post) => {
                console.log("on post creation: " + post._id);
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
        //const profImg = req.files.profileImg
        //const CharImg = req.files.faveCharImg
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
        
        // console.log(profImg)
        // console.log(CharImg)


        db.updateOne(Profile, {username: req.session.username }, {$set: {faveQuote: req.body.faveQuote, bio: req.body.bio}}, (err, res) => {
            console.log(res)
        }); 
        /*if (req.files.profileImg != null && !(req.files.faveCharImg))
        {
            console.log('condition1')
            const profImg = req.files.profileImg
            let newname = uuidv1() + path.extname(profImg.name)
            
            db.updateOne(Profile, {username: req.session.username }, {$set: {faveQuote: req.body.faveQuote, bio: req.body.bio, profileImg: '/images/' + newname}}, (err, res) => {
                console.log(res)
            }); 

        }
        else if (req.filefaveCharImg != null && !(req.files.profileImg))
        {
            console.log('condition2')
            const charImg = req.files.faveCharImg
            let newname = uuidv1() + path.extname(charImg.name)
            db.updateOne(Profile, {username: req.session.username }, {$set: {faveQuote: req.body.faveQuote, bio: req.body.bio, charImg: '/images/' + newname}}, (err, res) => {
                console.log(res)
            }); 
        }
        else if (req.files == null)
        {
            console.log('condition3')
            db.updateOne(Profile, {username: req.session.username }, {$set: {faveQuote: req.body.faveQuote, bio: req.body.bio}}, (err, res) => {
                console.log(res)
            }); 
        }
        else if (req.files.profileImg != null && req.filefaveCharImg != null)
        {
            console.log('condition4')
            const profImg = req.files.profileImg
            const CharImg = req.files.charImg

            let newname = uuidv4() + path.extname(profImg.name)
            let newname2 = uuidv4() + path.extname(charImg.name)
            db.updateOne(Profile, {username: req.session.username }, {$set: {faveQuote: req.body.faveQuote, bio: req.body.bio, profileImg: '/images/' + newname, charImg: '/images/' + newname2}}, (err, res) => {
                console.log(res)
            }); 
        }*/
        // db.findOne(Profile, { username: req.session.username }, '', (profile) =>{
           
        //     /*res.render('view_profile', { 
        //         username: req.session.username,
        //         profileUsername: req.session.username,
        //         headerProfileImg: profile.profileImg,
        //         profileImg: profile.profileImg,
        //         faveCharImg: profile.faveCharImg,
        //         bio: profile.bio,
        //         faveQuote: profile.faveQuote,
        //         pageTitle: 'View Profile', 
        //         name: req.session.name,
        //         layout: 'main',
        //         isOwnProfile: true
        //     });*/
        // })
        res.redirect('/view-profile?username=' + req.session.username)
    }
}

module.exports = homeController;
