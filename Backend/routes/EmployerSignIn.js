const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const util = require('util');
// var conn = require('../../constants');

// var QUERY_PROMISE;
// const ENCRYPTKEY = "cmpe_273_lab1";
// const mergeObjects = (dest, src) => {
//   for(var key in src) {
//     dest[key] = src[key];
//   }
//   return dest;  
// }

// var validateEmployerSignIn = async(req) => {
//   let sql, rows, result = {};
//   sql =  'SELECT * FROM employer WHERE companyname=\'' + req.body.companyname + '\'';
//   try {
//     rows = await QUERY_PROMISE(sql);
//   }catch(err){
//     console.log("Some exception occured ", err)
//     return []
//   }
//   if (!rows.length) {
//     console.log("Invalid user or password");
//     return []
//   }

//   let signin = JSON.parse(JSON.stringify(rows));
//   // Decrypt the password
//   var dcPasswd = CryptoJS.AES.decrypt(signin[0].password, ENCRYPTKEY);
//   dcPasswd = dcPasswd.toString(CryptoJS.enc.Utf8);
//   if (dcPasswd != req.body.password) {
//     console.log("Invalid password")
//     return [];
//   }
//   result = mergeObjects(result, signin[0]); 
//   return [result];
// }


router.post('/employersignin', function(req,res){
  // console.log("Inside employersignin Post Request");
  // console.log("Req Body : ", req.body);
  // QUERY_PROMISE = util.promisify(conn.CONNECTION.query).bind(conn.CONNECTION);  
  // let promise = validateEmployerSignIn(req);
  // promise.then((result) => {
  //   let valid_user = false;
  //   if (result.length) { valid_user = true}
  //   res.writeHead(200,{
  //     'Content-Type' : 'text/json'
  //   });
  //   let response_data = JSON.stringify({employersignin_successful : valid_user, details : result[0]});
  //   res.end(response_data);
  // }).catch((error) => {
  //   console.log(error)
  // });
});
module.exports = router;