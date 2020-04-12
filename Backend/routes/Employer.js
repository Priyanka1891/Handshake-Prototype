"use strict";
const express = require("express");
const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../Utils/config');
const router = express.Router();
var kafka = require('../kafka/client');
const passport = require('passport');
require('../Utils/passport')(passport);

//Route to handle Post Request Call
router.post('/signin', (req, res) => {
    kafka.make_request('employersignin', req.body, function(err,results){
        if (err){
            console.log("Inside err");
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end("Error");
        } else if (results.code == 200) {
            const payload = { _id: results.details._id, username: results.details.username};
            console.log("token " ,tokenSecret);
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


router.post('/signup',function(req,res){
  kafka.make_request('employersignup', req.body, function(err,results){
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


router.post('/editdetails', passport.authenticate('jwt', { session: false }), function(req, res) {
  kafka.make_request('editemployerdetails', req.body, function(err,results){
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