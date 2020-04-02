const { Users } = require('../Models/UserModel');
const CryptoJS = require('crypto-js');
const {secret } = require('../Utils/config');

 
function handle_request(msg, callback){
    console.log("Student Signup Req Body : ", msg);
    var res = {};

    Users.findOne({ username : msg.username }, (error, user) => {
      if (error) {
        res.code = 501;
        res.value = "Error occured";
        callback(null, res);
      }
      else if (user) {
        res.code = 200;
        res.value = "User already exists";
        callback(null, res);
      }
      else {
      // Encrypting the password
        var ecPasswd = CryptoJS.AES.encrypt(msg.password, secret);
        ecPasswd = ecPasswd.toString();
        var student_education  = {colgname : msg.colgname};
        var newUser = new Users({
          username : msg.username,
          email : msg.email,
          password : ecPasswd,
          studentEducation :[student_education]
        });    
        newUser.save((error, data) => {
          console.log("Data is"+data);
          if (error) {
            res.code = 401;
            res.value=error;
            callback(null, res);
          }
          else {
            res.code = 200;
            res.value = "User signed up successfully";
            callback(null, res);
          }
        });
      }
    });
}

exports.handle_request = handle_request;
