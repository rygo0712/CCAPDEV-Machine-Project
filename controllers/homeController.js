const db = require('../models/db.js');
const Post = require('../models/Post.js');

const moment = require('moment');
var path = require('path');

const homeController = {

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


      getPosts: (req,res) => {
        db.findMany(Post, {}, '', function (posts){
            console.log(posts);
            posts = posts.map(posts => posts.toJSON()); //formats 'posts' to JSON to remove mongoose schema formatting to edit the date on the next step
            posts.forEach(element => { //uses the moments module to format the date
                element.postingTime = moment(element.postingTime).fromNow();
            });
            console.log(posts);
            res.render('home', { 
                posts,
                pageTitle: 'Home', 
                name: req.session.name,
                layout: 'main' } );
        });
      }
    

}

module.exports = homeController;
