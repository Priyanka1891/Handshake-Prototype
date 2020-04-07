const { Events } = require('../Models/EventModel');
 
function handle_request(msg, callback){
    console.log("Job event Req Body : ", msg);
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

exports.handle_request = handle_request;
