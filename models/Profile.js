const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    username: { type: String, required: true },
    faveQuote: { type: String },
    bio: { type: String },
    profileImg: { type: String },
    faveCharImg: { type: String }, 
}); 

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;