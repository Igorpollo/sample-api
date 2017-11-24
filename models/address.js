var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Client = require('./client');

var addressSchema   = new Schema({
  name: {
      type: String,
      required: true
    },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address