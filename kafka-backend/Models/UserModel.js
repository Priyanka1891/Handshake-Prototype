const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: {type: String, required: true},
    email : {type: String, required: true},
    password: {type: String, required: true},
    basicDetails :  {

      name : {type: String, required: false},
      dob : {type: String, required: false},
      city : {type: String, required: false},
      state : {type: String, required: false},
      country : {type: String, required: false},
      contactno : {type: String, required: false},
      objective : {type: String, required: false},
      skills : {type: String, required: false}
  
    },
    studentEducation : [{

      colgname : {type: String, required: false},
      location : {type: String, required: false},
      degree : {type: String, required: false},
      major : {type: String, required: false},
      yearofpassing : {type: String, required: false},
      cgpa : {type: String, required: false}
    
    }],

    studentExperience : [{
    companyname : {type: String, required: false},
    companylocation : {type: String, required: false},
    title : {type: String, required: false},
    startdate : {type: String, required: false},
    enddate : {type: String, required: false},
    jobdetails : {type: String, required: false},

    }],

    // job id of jobs applied by the student.
    // jobsApplied : [{type: String, required: false}],

    // // event id of events registered by the student.
    // eventsApplied : [{type: String, required: false}],

    resume : {type: String, required: false},
    image : {type: String, required: false}
},
{
  versionKey: false
});

module.exports = {
    Users : mongoose.model('user', usersSchema),
}