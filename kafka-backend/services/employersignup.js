const { Employers } = require('../Models/EmployerModel');
const CryptoJS = require('crypto-js');
const {secret } = require('../Utils/config');

 
function handle_request(msg, callback){
    console.log("Employer Signup Req Body : ", msg);
    var res = {};

    Employers.findOne({ username : msg.username }, (error, user) => {
      if (error) {
        res.code = 501;
        res.value = "Error occured";
        callback(null, res);
      }
      else if (user) {
        res.code = 200;
        res.value = "Employer already exists";
        callback(null, res);
      }
      else {
      // Encrypting the password
        var ecPasswd = CryptoJS.AES.encrypt(msg.password, secret);
        ecPasswd = ecPasswd.toString();
        var newEmployer = new Employers({
          username : msg.username,
          email : msg.email,
          password : ecPasswd,
          location : msg.location
        });    
        newEmployer.save((error, data) => {
          console.log("Data is"+data);
          if (error) {
            res.code = 401;
            res.value=error;
            callback(null, res);
          }
          else {
            res.code = 200;
            res.value = "Employer signed up successfully";
            callback(null, res);
          }
        });
      }
    });
}

exports.handle_request = handle_request;
