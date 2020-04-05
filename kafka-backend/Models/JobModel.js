const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var jobsSchema = new Schema({
    title: {type: String, required: true},
    createdate : {type: String, required: true},
    enddate: {type: String, required: true},
    location : {type: String, required : true},
    salary :  {type: String, required : true},
    description :  {type: String, required : true},
    type :  {type: String, required : true},
    createdby : {type: String, required : true},
    // username/id of students applied
    studentsapplied : [{type: String, required : true}]
},
{
    versionKey: false
});


module.exports = {
    Jobs : mongoose.model('job', jobsSchema)
}
