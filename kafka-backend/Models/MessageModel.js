const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messagesSchema = new Schema({
    usera : {type: String, required: true},
    userb : {type: String, required: true},
    messages : [{
      sender : {type: String, required: false},
      content : {type: String, required: false},
    }]
},
{
    versionKey: false
});

module.exports = {
    Messages : mongoose.model('message', messagesSchema)
}
