var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var User = require('./user');
var Address = require('./address');

var clientSchema   = new Schema({
  name: {
      type: String,
      required: true
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    addresses: [{type: Schema.Types.ObjectId, ref: 'Address'}]

    
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client