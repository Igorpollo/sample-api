var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
  email: {
      type: String,
      required: true,
      unique: true
    },
    password: String,
    name: {type: String, required: true},
    city: {type: String, required: true},
    address: {type: String, required: true},
    number: {type: String, required: true},
    complement: {type: String},
    CEP: {type: String, required: true},


});

const User = mongoose.model('User', userSchema);
module.exports = User
