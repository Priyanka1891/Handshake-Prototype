const { Jobs } = require('../Models/JobModel');
const { Users } = require('../Models/UserModel');
const actions = require('../../Backend/Utils/constant');
 

function listJob(msg, callback) {
  var res = {};
 var query={};
  if(msg.jobQuery)
  {
    query={$or: [{'title': {$regex: '.*' + msg.jobQuery + '.*', $options:'i'}}, 
    {'createdby': {$regex: '.*' + msg.jobQuery + '.*', $options:'i'} }
    ]};
  }
  Jobs.find(  query , (error, data) => {
    if (error) {
      res.code = 500;
      res.value=error;
      callback(null, res);
    }
    else {
      res.code = 200;
      var sdata = data;
      sdata.sort((a,b) => {
        var _a = new Date(a.enddate);
        var _b = new Date(b.enddate);
        return _a.getTime() - _b.getTime();
      });
      res.value = sdata;
      callback(null, res);
    }
  }); 
}

function studentSearch(msg, callback) {
  var res= {},query={};
  if(msg.studentQuery){  
    query = {$or: [{'basicDetails.name': {$regex: '.*' + msg.studentQuery + '.*', $options:'i'}}, 
            {'studentEducation.colgname': {$regex: '.*' + msg.studentQuery + '.*', $options:'i'} },
            {'basicDetails.skills': {$regex: '.*' + msg.studentQuery + '.*', $options:'i'}}]};
  }
  Users.find(query, (error, data) => {
    if (error) {
      res.code = 500;
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
      res.code = 500;
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
function jobsApplied(msg, callback) {
var res = {};
console.log("Inside jobs applied ",msg);
var today = new Date();

var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
var studentdetail = {};
studentdetail.username = msg.username;
studentdetail.applicationdate = today;
// studentdetail.
  // Jobs.find({'studentsapplied.username': msg.username},(error,data) => {
Jobs.findById({ _id : msg.jobId },(error,data) => {
    // console.log("data fetched is",data);
    if (error){
      res.code = 500;
      res.value=error;
      callback(null, res);
    }
    for(let idx=0;idx<data.studentsapplied.length;idx++){
      if (data.studentsapplied[idx].username === msg.username){
        // console.log("Should reach here");
        res.code = 200;
        res.value = "Already applied";
        callback(null, res);}
    }
      Jobs.updateOne({ _id : msg.jobId}, {$addToSet : {studentsapplied: studentdetail}} ,(error,data) => {
        if (error) {
          res.code = 500;
          res.value=error;
          callback(null, res);
        }
        else{
          res.code = 200;
          res.value = "Job applied successfully";
          callback(null, res);
        }
    });
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
    else if(msg.action == actions.JOBSAPPLIED){
      jobsApplied(msg.body, callback);
      return;
    }
}

exports.handle_request = handle_request;
