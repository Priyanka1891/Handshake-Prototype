const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: {type: String, required: true},
    email : {type: String, required: true},
    password: {type: String, required: true}
},
{
    versionKey: false
});


var studentDetailsSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name : {type: String, required: false},
    dob : {type: String, required: false},
    city : {type: String, required: false},
    state : {type: String, required: false},
    country : {type: String, required: false},
    contactno : {type: String, required: false},
    objective : {type: String, required: false},
    skills : {type: String, required: false}
},
{
    versionKey: false
});

var studentEducationSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    colgname : {type: String, required: false},
    location : {type: String, required: false},
    degree : {type: String, required: false},
    major : {type: String, required: false},
    yearofpassing : {type: String, required: false},
    cgpa : {type: String, required: false}
},
{
    versionKey: false
});


var studentExperienceSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    companyname : {type: String, required: false},
    title : {type: String, required: false},
    companylocation : {type: String, required: false},
    startdate : {type: String, required: false},
    enddate : {type: String, required: false},
    jobdetails : {type: String, required: false}
},
{
    versionKey: false
});


// TODO: employee schemas


module.exports = {
    Users : mongoose.model('user', usersSchema),
    studentDetails : mongoose.model('studentdetails', studentDetailsSchema),
    studentEducation : mongoose.model('studenteducation', studentEducationSchema),
    studentExperience : mongoose.model('studentexperience', studentExperienceSchema)
}