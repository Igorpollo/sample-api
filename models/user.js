var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
  email: {
      type: String,
      required: true,
      unique: true
    },
    password: String
});

const User = mongoose.model('User', userSchema);
module.exports = User
