const db = require('../models/db.js');
const Post = require('../models/Post.js');

var path = require('path');

const homeController = {

    submitPost: (req, res) => {
        const image = req.files.imageContent
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
        });
      },


      getPosts: (req,res) => {
        db.findMany(Post, {}, '', function (posts){
            console.log(posts)
            res.render('home', { 
                posts: posts.map(posts => posts.toJSON()),
                pageTitle: 'Home', 
                name: req.session.name,
                layout: 'main' } );
        });
      }
    

}

module.exports = homeController;
