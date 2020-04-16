const { Events } = require('../Models/EventModel');
// const { Users } = require('../Models/UserModel');
const actions = require('../../Backend/Utils/constant');
var res={}; 

function listStudentEvent(msg, callback) {
  // var res = {};
  var query = {};
  // if(msg.eventQuery){
  //   query = {'title': {$regex: '.*' + msg.eventQuery + '.*', $options:'i'}}
  // }
  Events.find(query, (error, data) => {
    if (error) {
      res.code = 500;
      res.value=error;
      callback(null, res);
    }
    else {
      // console.log("HERE",data);
      res.code = 200;
      var sdata = data;
      sdata.sort((a,b) => {
        var _a = new Date(a.date);
        var _b = new Date(b.date);
        return _a.getTime() - _b.getTime();
      });
      res.value = sdata;
      callback(null, res);
    }
  }); 
}

function listEvent(msg, callback) {
  // var res = {};
  // console.log("Came here",msg);
  Events.find({createdby : msg.eventQuery}, (error, data) => {
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


function postEvent(msg, callback){
    // console.log("Job event Req Body : ", msg);
    // var res = {};
    var newEvent = new Events({
      title : msg.eventTitle,
      date : msg.eventDate,
      detail : msg.eventDetail,
      location : msg.eventLocation,
      createdby : msg.companyName,
      eligibility : msg.eligibility
    });
    
    newEvent.save((error, data) => {
      if (error) {
        res.code = 500;
        res.value=error;
        callback(null, res);
      }
      else {
        res.code = 200;
        res.value = "Event posted successfully";
        callback(null, res);
      }
    }); 
}

function registeredstudenteventlist(msg,callback){
  // var res = {};
  console.log('Username is',msg.username);
  Events.find({'studentsregistered.username' : msg.username}, (error, data) => {
    if (error) {
      res.code = 500;
      res.value=error;
      callback(null, res);
    }
    else {
      res.code = 200;
      res.value = data;
      // console.log("Data here is ",data);
      callback(null, res);
    }
  });
}

function regiterstudentevent(msg, callback) {
  var studentdetail = {};
studentdetail.username = msg.username;

  Events.findById({ _id : msg.eventId },(error,data) => {
      console.log("data fetched is",data);
      if (error){
        res.code = 500;
        res.value=error;
        callback(null, res);
      }
      for(let idx=0;idx<data.studentsregistered.length;idx++){
        if (data.studentsregistered[idx].username === msg.username){
          console.log("Should reach here");
          res.code = 200;
          res.value = "Already applied";
          callback(null, res);}
      }
        Events.updateOne({ _id : msg.eventId}, {$addToSet : {studentsregistered: studentdetail}} ,(error,data) => {
          if (error) {
            res.code = 500;
            res.value=error;
            callback(null, res);
          }
          else{
            res.code = 200;
            res.value = "Event registered successfully";
            callback(null, res);
          }
      });
    });
  }

function registeredstudentlist(msg,callback){
  Events.findOne({'_id' : msg.eventId}, (error, data) => {
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


function handle_request(msg, callback){
  console.log("Event Req Body : ", msg);
  if (msg.action == actions.POSTEVENT) {
    postEvent(msg.body, callback);
    return;
  }
  else if(msg.action == actions.LISTEVENT && !msg.body.isStudent){
    listEvent(msg.body, callback);
    return;
  }
  else if(msg.action == actions.LISTEVENT && msg.body.isStudent){
    listStudentEvent(msg.body, callback);
    return;
  }
  else if(msg.action == actions.LISTREGISTEREDSTUDENT){
    regiterstudentevent(msg.body, callback);
    return;
  }
  else if(msg.action == actions.REGISTERSTUDENTEVENTLIST){
    registeredstudenteventlist(msg.body, callback);
    return;
  }
  else if(msg.action == actions.REGISTEREDSTUDENTLIST){
    registeredstudentlist(msg.body, callback);
    return;
  }
}

exports.handle_request = handle_request;
