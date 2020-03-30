const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
// var conn = require('../../constants');

const ENCRYPTKEY = "cmpe_273_lab1";

  //Route to handle Post Request Call
router.post('/studentsignup',function(req,res) {
  console.log("Student Signup Req Body : ", req.body);
  var signup_failed = false;
  // Encrypting the password
  var ecPasswd = CryptoJS.AES.encrypt(req.body.password, ENCRYPTKEY);
  ecPasswd = ecPasswd.toString();
  let sql = 'INSERT INTO student (username, email, password, colgname) VALUES(\'' 
        + req.body.username +'\',\'' +req.body.email+'\',\''+ecPasswd+'\',\''+req.body.colgname+'\')';
  console.log("Insertion data " + sql);
  // .CONNECTION.query(sql, function (err, result) {
  //   if (err) {
  //     signup_failed = true;
  //     console.log(err);
  //   }
  //   res.writeHead(200,{
  //     'Contentconn-Type' : 'text/json'
  //   })
  //   let response_data = JSON.stringify({signup_fail : signup_failed, details : req.body});
  //   res.end(response_data);
  // });
});
module.exports = router;