const db = require('../models/db.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const Profile = require('../models/Profile.js');
const User = require('../models/User.js');

var path = require('path');

const controller = {

    getIndex: function(req, res) {
        res.sendFile(path.resolve('./views/index.html'));
    },
    

}

module.exports = controller;