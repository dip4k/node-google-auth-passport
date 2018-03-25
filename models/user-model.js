const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const userSchema = new Schema({
  username: {
    required: true,
    type: String,
    minlength: 2
  },
  googleId: {
    type: String
  },
  thumbnail: {
    type: String
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
