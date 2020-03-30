const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const { secret } = require('../Utils/config');
const { Users, studentDetails } = require('../Models/UserModel');

//Route to handle Post Request Call
router.post('/studentsignup',function(req,res) {
  console.log("Student Signup Req Body : ", req.body);
  // Encrypting the password
  var ecPasswd = CryptoJS.AES.encrypt(req.body.password, secret);
  ecPasswd = ecPasswd.toString();
  var newUser = new Users({
    username : req.body.username,
    email : req.body.email,
    password : ecPasswd,
  });

  Users.findOne({ username : req.body.username }, (error, user) => {
    if (error) {
      res.writeHead(500, {
          'Content-Type': 'text/plain'
      })
      res.end();
    }
    if (user) {
      res.writeHead(200, {
          'Content-Type': 'text/plain'
      })
      res.end("User already exists");
    }
    else {
      newUser.save((error, data) => {
        if (error) {
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          })
          res.end();
        }
        else {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end("User signed up successfully");
        }
      });
    }
  });
});
module.exports = router;