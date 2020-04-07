const { Events } = require('../Models/EventModel');
// const { Users } = require('../Models/UserModel');
const actions = require('../../Backend/Utils/constant');

function listEvent(msg, callback) {
  var res = {};
  // console.log("Inside list event request");
  Events.find( {createdby: msg.eventQuery }, (error, data) => {
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
        res.code = 401;
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
}

exports.handle_request = handle_request;
