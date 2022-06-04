const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    username: String,
    faveQuote: String,
    bio: String,
    profileImg: String,
    faveCharImg: String
}); // JSON format, consisting of the name: type collection

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;