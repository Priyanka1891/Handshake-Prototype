const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var eventsSchema = new Schema({
    title : {type: String, required: true},
    date : {type: String, required: true},
    detail : {type: String, required: true},
    location : {type: String, required : true},
    createdby : {type: String, required : true},
    // username/id of students applied
    studentsregistered : [{type: String, required : true}]
},
{
    versionKey: false
});


module.exports = {
    Events : mongoose.model('event', eventsSchema)
}
