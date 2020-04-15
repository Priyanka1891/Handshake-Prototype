const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messagesSchema = new Schema({
    usera : {type: String, required: true},
    userb : {type: String, required: true},
    messages : [{
      _id : {required : false},
      sender : {type: String, required: true},
      content : {type: String, required: true},
      timestamp : {type: String, required: true}
    },{strict:false}]
},
{
    versionKey: false
});

module.exports = {
    Messages : mongoose.model('message', messagesSchema)
}
