var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
  email: {
      type: String,
      required: true,
      unique: true
    },
    password: String,
    name: {type: String, required: false},
    city: {type: String, required: false},
    address: {type: String, required: false},
    number: {type: String, required: false},
    complement: {type: String},
    CEP: {type: String, required: false},


});

const User = mongoose.model('User', userSchema);
module.exports = User
