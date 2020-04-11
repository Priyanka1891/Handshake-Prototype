const { Employers } = require('../Models/EmployerModel');


function handle_request(msg, callback){
    Employers.replaceOne({"username" : msg.details.username}, msg.details, (error, data) => {
      var res = {};
        if (error) {
            res.code = 500;
            res.value = "Error occured";
            callback(null, res);
        }
        else {
            res.code = 200;
            res.value = data;
            callback(null, res);
        }
    });
}


exports.handle_request = handle_request;