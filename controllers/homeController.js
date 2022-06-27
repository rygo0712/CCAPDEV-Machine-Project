const db = require('../models/db.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const Profile = require('../models/Profile.js');
const User = require('../models/User.js');

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

      

    

}

module.exports = homeController;
