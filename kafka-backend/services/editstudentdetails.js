const jwt = require('jsonwebtoken');
const { secret } = require('../Utils/config');
const { Users} = require('../Models/UserModel');



function handle_request(msg, callback){
  console.log("Got data",msg);
    Users.findOne({ username: msg.username}, (error, user) => {
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
            if (dcPasswd != msg.password) {
                res.code = 401;
                res.value = "Invalid password";
                callback(null, res);
                return;
            }
            const payload = { _id: user._id, username: user.username};
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });
              res.code = 200;
              res.value = "JWT " + token;
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