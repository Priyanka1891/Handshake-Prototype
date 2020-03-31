const jwt = require('jsonwebtoken');
const { secret } = require('../Utils/config');
const { Users } = require('../Models/UserModel');
const CryptoJS = require('crypto-js');

function handle_request(msg, callback){
    console.log("Reached here ", msg);
    var res = {};
    Users.findOne({ username: msg.username}, (error, user) => {
        if (error) {
            res.code = 200;
            res.value = "Error occured";
            callback(null, res);
        }
        if (user) {
            var dcPasswd = CryptoJS.AES.decrypt(user.password, secret);
            dcPasswd = dcPasswd.toString(CryptoJS.enc.Utf8);
            if (dcPasswd != msg.password) {
                console.log("Invalid password")
                res.status(401).end("Invalid Credentials");
            }
            const payload = { _id: user._id, username: user.username};
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });
            res.code = 200;
            res.value = "JWT " + token;
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