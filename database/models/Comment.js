const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({ // Each entry matches the data types in the HTML form
    textContent: String,
    imageContent: String,
    user: String,
    postingTime: DateTime,
    numLikes: Number,
    //parent: CommentSchema,
    //children: [CommentSchema] // children attribute is an array of comments
}) // JSON format, consisting of the name: type collection

const Comment = mongoose.model('Comment', CommentSchema); // Create Post based on schema model

module.exports = Comment; // Export model so it can be used by index.js