var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var clientSchema   = new Schema({
  name: {
      type: String,
      required: true
    },
    userId: String,
    address: [{street: String, number: String, CEP: String, name: String}],

    
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client