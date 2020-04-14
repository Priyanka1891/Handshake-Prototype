const { Events } = require('../Models/EventModel');
// const { Users } = require('../Models/UserModel');
const actions = require('../../Backend/Utils/constant');

function listEvent(msg, callback) {
  var res = {};
  var query = {};
  if(msg.eventQuery){
    query = {$or: [{'title': {$regex: '.*' + msg.eventQuery + '.*', $options:'i'}}, 
    {'createdby': {$regex: '.*' + msg.eventQuery + '.*', $options:'i'} }
    ]};
  }
  Events.find(query, (error, data) => {
    if (error) {
      res.code = 500;
      res.value=error;
      callback(null, res);
    }
    else {
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

function postEvent(msg, callback){
    // console.log("Job event Req Body : ", msg);
    var res = {};
    var newEvent = new Events({
      title : msg.eventTitle,
      date : msg.eventDate,
      detail : msg.eventDetail,
      location : msg.eventLocation,
      createdby : msg.companyName
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

function listregisteredstudent(msg,callback){
  var res = {};
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

  function handle_request(msg, callback){
  console.log("Event Req Body : ", msg);
  if (msg.action == actions.POSTEVENT) {
    postEvent(msg.body, callback);
    return;
  }
  else if(msg.action == actions.LISTEVENT){
    listEvent(msg.body, callback);
    return;
  }
  else if(msg.action == actions.LISTREGISTEREDSTUDENT){
    listregisteredstudent(msg.body, callback);
    return;
  }
}

exports.handle_request = handle_request;
