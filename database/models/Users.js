const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    username: String,
	password: String,
	image: String
}); // JSON format, consisting of the name: type collection

const Users = mongoose.model('Users', PostSchema);

module.exports = Users;