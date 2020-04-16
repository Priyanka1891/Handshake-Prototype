const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var eventsSchema = new Schema({
    title : {type: String, required: true},
    date : {type: String, required: true},
    detail : {type: String, required: true},
    location : {type: String, required : true},
    createdby : {type: String, required : true},
    eligibility : {type: String, required : true},
    // username/id of students applied
    studentsregistered : 
    [{
      _id : {required : false},
      username : {type: String, required : true},
      // filter : {type: String, required : true}
    },{strict:false}]
},
{
    versionKey: false
});


module.exports = {
    Events : mongoose.model('event', eventsSchema)
}
