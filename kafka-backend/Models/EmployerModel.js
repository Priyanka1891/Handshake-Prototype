const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var employersSchema = new Schema({
    username: {type: String, required: true},
    email : {type: String, required: true},
    password: {type: String, required: true},
    location : {type: String, required : true},
    name :  {type: String, required : false},
    description :  {type: String, required : false},
    contactno :  {type: String, required : false},
    image : {type: String, required: false}
},
{
    versionKey: false
});


module.exports = {
    Employers : mongoose.model('employer', employersSchema)
}
