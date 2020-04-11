const { Users} = require('../Models/UserModel');

function handle_request(msg, callback){
    Users.replaceOne({"username" : msg.details.username}, msg.details, (error, data) => {
      var res = {};
        if (error) {
            res.code = 500;
            res.value = "Error occured";
            callback(null, res);
        }
        else {
            res.code = 200;
            res.value = "Success";
            callback(null, res);
        }
    });
}

exports.handle_request = handle_request;