const { Messages } = require('../Models/MessageModel');
 
function handle_request(msg, callback){
    console.log("Message post Req Body : ", msg);
    var res = {};
    // TODO : if participant combination exists, update only messages 
    var newMessage = new Messages({
      usera : msg.participants[0],
      userb : msg.participants[1],
      messages : msg.messages
    });
    
    newMessage.save((error, data) => {
      if (error) {
        res.code = 401;
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

exports.handle_request = handle_request;
