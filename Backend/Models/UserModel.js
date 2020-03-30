const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
},
{
    versionKey: false
});


var usersDetailsSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name : {type: String, required: true},
    dob : {type: String, required: true},
    city : {type: String, required: true},
    state : {type: String, required: true},
    country : {type: String, required: true},
    contactno : {type: String, required: true},
    objective : {type: String, required: true},
    skills : {type: String, required: true}

},
{
    versionKey: false
});

var usersEducationSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    colgname : {type: String, required: true},
    location : {type: String, required: true},
    degree : {type: String, required: true},
    major : {type: String, required: true},
    yearofpassing : {type: String, required: true},
    cgpa : {type: String, required: true}
},
{
    versionKey: false
});


var usersExperienceSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    companyname : {type: String, required: true},
    title : {type: String, required: true},
    companylocation : {type: String, required: true},
    startdate : {type: String, required: true},
    enddate : {type: String, required: true},
    jobdetails : {type: String, required: true}
},
{
    versionKey: false
});

module.exports = {
    Users : mongoose.model('user', usersSchema),
    studentDetails : mongoose.model('userdetails', usersDetailsSchema),
    studentEducation : mongoose.model('usereducation', usersEducationSchema),
    studentExperience : mongoose.model('userexperience', usersExperienceSchema)
}