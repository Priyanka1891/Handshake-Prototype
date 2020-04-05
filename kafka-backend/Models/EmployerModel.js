const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var employersSchema = new Schema({
    username: {type: String, required: true},
    email : {type: String, required: true},
    password: {type: String, required: true},
    location : {type: String, required : true},
    
    versionKey: false
});


module.exports = {
    Employers : mongoose.model('employer', employersSchema)
}
