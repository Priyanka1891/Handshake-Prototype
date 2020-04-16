const { secret } = require('../Utils/config');
const { Employers } = require('../Models/EmployerModel');
const CryptoJS = require('crypto-js');

function handle_request(msg, callback){
    Employers.findOne({ username: msg.username}, (error, user) => {
      var res = {};
        if (error) {
            res.code = 500;
            res.value = "Error occured";
            callback(null, res);
        }
        if (user) {
            var dcPasswd = CryptoJS.AES.decrypt(user.password, secret);
            dcPasswd = dcPasswd.toString(CryptoJS.enc.Utf8);
            console.log("Pass :" ,dcPasswd , msg.password)
            if (dcPasswd != msg.password && msg.editmode) {
                res.code = 401;
                res.value = "Invalid password";
                callback(null, res);
                return;
            }
            res.code = 200;
            res.details = user;
            callback(null, res);
        }
        else {
            res.code = 401;
            res.value = "Invalid Credentials";
            callback(null, res);
        }
    });
}


exports.handle_request = handle_request;