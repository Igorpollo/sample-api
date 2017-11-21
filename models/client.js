var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var clientSchema   = new Schema({
  name: {
      type: String,
      required: true,
      unique: true
    },
    userId: String,
    
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client