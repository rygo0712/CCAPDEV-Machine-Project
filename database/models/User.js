const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
	password: String,
}); // JSON format, consisting of the name: type collection

const User = mongoose.model('User', UserSchema);

module.exports = User;