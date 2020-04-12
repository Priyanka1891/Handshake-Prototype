"use strict";
const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');
const actions = require('../Utils/constant');
const passport = require('passport');
require('../Utils/passport')(passport);


//Route to handle Post Request Call
router.post('/post', passport.authenticate('jwt', { session: false }), (req,res) => {  
  var msg = {action : actions.POSTMSG, body : req.body}  
  kafka.make_request('messages', msg, function(err,results){
    console.log(results);
    if (err){
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        })
        res.end("Error");
    }else{
        res.writeHead(results.code, {
            'Content-Type': 'text/plain'
        })
        res.end(results.value);
    }           
  });
});


router.post('/list', passport.authenticate('jwt', { session: false }), (req,res) => { 
    var msg = {action : actions.LISTMSGS, body : req.body}
    kafka.make_request('messages', msg, function(err,results){
      console.log(results);
      if (err){
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end("Error");
      }else{
          res.writeHead(results.code, {
              'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(results.value));
      }           
    });
  });
module.exports = router;