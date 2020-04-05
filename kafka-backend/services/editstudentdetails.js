const { Users} = require('../Models/UserModel');

function handle_request(msg, callback){
  // console.log("Got data", JSON.stringify(msg));
    Users.replaceOne({username : msg.username}, msg, (error, data) => {
      var res = {};
        if (error) {
            res.code = 500;
            res.value = "Error occured";
            callback(null, res);
        }
        else {
          console.log("Editted data is: ",JSON.stringify(data));
            res.code = 200;
            res.value = data;
            callback(null, res);
        }
    });
}


exports.handle_request = handle_request;