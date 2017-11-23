var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var User = require('./user');

var clientSchema   = new Schema({
  name: {
      type: String,
      required: true
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    addresses: [{street: String}]

    
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client