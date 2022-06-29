const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({ // Each entry matches the data types in the HTML form
    textContent: { type: String, required: true },
    imageContent: { type: String },
    username: { type: String },
    postingTime: {type: Date, default: Date.now},
    likesBy: { type: [String], default: [] },
    // (reference the post the comment was made on)
    postid: { type: String}, 
    parentComment: { type: mongoose.Types.ObjectId, ref: 'CommentSchema', default: null },
}); // JSON format, consisting of the name: type collection
//either
// make separate collection for each post
    // track each user, each post is its own collection
// mongodb relationships between documents
    // style collections 
const Comment = mongoose.model('Comment', CommentSchema); // Create Post based on schema model

module.exports = Comment; // Export model so it can be used by index.js
