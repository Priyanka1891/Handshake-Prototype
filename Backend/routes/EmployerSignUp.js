const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
// var conn = require('../../constants');
const ENCRYPTKEY = "cmpe_273_lab1";


router.post('/employersignup',function(req,res){
  // console.log("Inside employersignup Post Request");
  // console.log("Req Body : ", req.body);

  // var signup_failed = false;
  // // Encrypting the password
  // var ecPasswd = CryptoJS.AES.encrypt(req.body.password, ENCRYPTKEY);
  // ecPasswd = ecPasswd.toString();
  
  // let sql = 'INSERT INTO employer (companyname, email, password, location) VALUES(\'' 
  //       + req.body.companyname +'\',\'' +req.body.email+'\',\''+ecPasswd+'\',\''+req.body.location+'\')';
  // console.log("Insertion data " + sql);
  // conn.CONNECTION.query(sql, function (err, result) {
  //   if (err) {
  //     signup_failed = true;
  //     console.log("Signup failed")
  //   }
  //   res.writeHead(200,{
  //     'Content-Type' : 'text/json'
  //   })
  //   let response_data = JSON.stringify({signup_fail : signup_failed, details : req.body});
  //   res.end(response_data);
  // });
}); 
module.exports = router;