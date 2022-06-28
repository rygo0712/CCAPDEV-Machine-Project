const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    username: { type: String, required: true },
    faveQuote: { type: String, default: "" },
    bio: { type: String, default: ""  },
    profileImg: { type: String, default: "./public/images/generic_profile_pic.png" },
    faveCharImg: { type: String, default: "./public/images/generic_profile_pic.png"  }, 
}); 

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;