"use strict";
const express = require("express");
const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../Utils/config');
const router = express.Router();
const passport = require('passport');
require('../Utils/passport')(passport);
var kafka = require('../kafka/client');

//Route to handle Post Request Call
router.post('/signin', (req, res) => {
    kafka.make_request('signin', req.body, function(err,results){
        if (err){
            console.log("Inside err");
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end("Error");
        } else if (results.code == 200){
            const payload = {_id: results.details._id, username: results.details.username};
            // console.log("token " ,tokenSecret);
            const token = jwt.sign(payload, tokenSecret, {
                expiresIn: 1008000
            });
            res.writeHead(results.code, {
                'Content-Type': 'text/plain'
            })
            var result_with_token = results;
            result_with_token.value = "JWT " + token;
            res.end(JSON.stringify(result_with_token));
        } else {
            res.writeHead(results.code, {
                'Content-Type': 'text/plain'
            });
            res.end("Invalid credentials");
        }   
    });
});


//Route to handle Post Request Call
router.post('/signup',(req,res) => {
  kafka.make_request('studentsignup', req.body, function(err,results){
    console.log('in result');
    if (err){
        console.log("Inside err");
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


//Route to handle Post Request Call
router.post('/editdetails', passport.authenticate('jwt', { session: false }), (req, res) => {
  kafka.make_request('editstudentdetails', req.body, function(err,results){
      if (err){
          console.log("Inside err");
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          });
          res.end("Error");
      }else{
          res.writeHead(results.code, {
              'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(results));
      }    
  });
});

router.post('/deletedetails', passport.authenticate('jwt', { session: false }), (req, res) => {
  // console.log("Reached Here ");
  kafka.make_request('deletestudentdetails', req.body, function(err,results){
      // console.log('in result',results);
      if (err){
          console.log("Inside err");
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          });
          res.end("Error");
      }else{
          res.writeHead(results.code, {
              'Content-Type': 'text/plain'
          })
          res.end(JSON.stringify(results));
      }    
  });
});


module.exports = router;