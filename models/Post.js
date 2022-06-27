const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({ // Each entry matches the data types in the HTML form
    title: { type: String, required: true },
    textContent: {type: String, required: true },
    imageContent: { type: String },
    username: { type: String },
    postingTime: {type: Date, default: Date.now},
    numLikes: { type: Number, default: 0 },
    // numComments obtained by counting number of comments in the DB that refer to the post
    numComments: { type: Number, default: 0 }
}); 

const Post = mongoose.model('Post', PostSchema); // Create Post based on schema model

module.exports = Post; // Export model so it can be used by index.js