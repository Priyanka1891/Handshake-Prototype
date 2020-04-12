const { Messages } = require('../Models/MessageModel');
const actions = require('../../Backend/Utils/constant');


var postMsg = (msg, callback) => {
  var res = {};
  var filter = {$or : [
                  {$and: [{'usera' : msg.participants[0]}, {'userb' : msg.participants[1]}]},
                  {$and: [{'usera' : msg.participants[1]}, {'userb' : msg.participants[0]}]}
                ]};
  try {
    Messages.findOne(filter, (error, msgdata) => {
      if (error) {
        res.code = 500;
        res.value=error;
        callback(null, res)
        return;
      }

      if (msgdata) {
        Messages.updateOne({_id : msgdata._id}, {$addToSet : {messages : {$each :msg.messages}}} ,(error, data) => {
          if (error) {
            res.code = 500;
            res.value=error;
            callback(null, res)
            return;
          }
          console.log("updated messages");
          res.code = 200;
          res.value = "Messages posted successfully";
          callback(null, res);
        });
      } else {
        var newMessage = new Messages({
          usera : msg.participants[0],
          userb : msg.participants[1],
          messages : msg.messages
        });

        newMessage.save((error, data) => {
          if (error) {
            res.code = 500;
            res.value=error;
            callback(null, res);
          }
          else {
            res.code = 200;
            res.value = "Messages posted successfully";
            callback(null, res);
          }
        });
      } 
    });
  } catch(e) {
    console.error(e);
  }
 }

var listMsg = (msg, callback) => {
  var res = {};
  var filter = {$or : [
    {'usera' : msg.username},
    {'userb' : msg.username}
  ]};
  try {
    Messages.find(filter, (error, msgdata) => {
      if (error) {
        res.code = 500;
        res.value=error;
        callback(null, res);
        return;
      }
      res.code = 200;
      res.value = msgdata;
      callback(null, res);
    });
  } catch (e) {
    console.error(e);
  }
}

function handle_request(msg, callback){
  console.log("Message Req Body : ", msg);
  if (msg.action == actions.POSTMSG) {
    postMsg(msg.body, callback);
  }
  else if(msg.action == actions.LISTMSGS){
    listMsg(msg.body, callback);
  }   
}

exports.handle_request = handle_request;
