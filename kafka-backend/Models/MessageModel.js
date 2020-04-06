const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messagesSchema = new Schema({
    student : {type: String, required: true},
    employer : {type: String, required: true},
    messages : [{
      sender : {type: String, required: false},
      content : {type: String, required: false},
    }]
},
{
    versionKey: false
});


module.exports = {
    Employers : mongoose.model('message', messagesSchema)
}
