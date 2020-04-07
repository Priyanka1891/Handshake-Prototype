const { Jobs } = require('../Models/JobModel');
const { Users } = require('../Models/UserModel');
const actions = require('../../Backend/Utils/constant');
 
function listJob(msg, callback) {
  var res = {};
  console.log("Inside search job request");
  Jobs.find({ createdby: msg.jobQuery}, (error, data) => {
    if (error) {
      res.code = 401;
      res.value=error;
      callback(null, res);
    }
    else {
      res.code = 200;
      res.value = data;
      callback(null, res);
    }
  }); 
}

function studentSearch(msg, callback) {
  var res = {};
  // console.log("Inside search student request");
  Users.find({$or: [{'basicDetails.name' : msg.studentQuery}, 
                    {'studentEducation.colgname': msg.studentQuery},
                    {'basicDetails.skills':  msg.studentQuery }]}, (error, data) => {
    if (error) {
      res.code = 401;
      res.value=error;    
      callback(null, res);
    }
    else {
      res.code = 200;
      res.value = data;
      callback(null, res);
    }
  }); 
}



function postJob(msg, callback) {
  var res = {};
  var newJob = new Jobs({
    title : msg.title,
    createdate : msg.createdate,
    enddate : msg.enddate,
    location : msg.location,
    salary : msg.salary,
    description : msg.description,
    type : msg.type,
    createdby : msg.companyname
  });
  
  newJob.save((error, data) => {
    if (error) {
      res.code = 401;
      res.value=error;
      callback(null, res);
    }
    else {
      res.code = 200;
      res.value = "Job posted successfully";
      callback(null, res);
    }
  }); 
}


function handle_request(msg, callback){
    console.log("Job Req Body : ", msg);
    if (msg.action == actions.POSTJOB) {
      // console.log("Inside post job");
      postJob(msg.body, callback);
      return;
    }
    else if(msg.action == actions.LISTJOB){
      // console.log("Inside job search");
      listJob(msg.body, callback);
      return;
    }
    else if(msg.action == actions.STUDENTSEARCH){
      // console.log("Inside student search");
      studentSearch(msg.body, callback);
      return;
    }
}

exports.handle_request = handle_request;
