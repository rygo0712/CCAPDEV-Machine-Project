const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
	password: { type: String, min: 8, required: true },
    date: { type: Date, default: Date.now }
}); // JSON format, consisting of the name: type collection

const User = mongoose.model('User', UserSchema);

// Saving a user given the validated object
exports.create = function(obj, next) {
    const user = new User(obj);
  
    user.save(function(err, user) {
      next(err, user);
    });
  };
  
// Retrieving a user based on ID
exports.getById = function(id, next) {
    User.findById(id, function(err, user) {
      next(err, user);
    });
  };
  
// Retrieving just ONE user based on a query (first one)
exports.getOne = function(query, next) {
    User.findOne(query, function(err, user) {
      next(err, user);
    });
  };