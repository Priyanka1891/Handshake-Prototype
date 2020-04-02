"use strict";
const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');


//Route to handle Post Request Call
router.post('/studentsignup',(req,res) => {
  kafka.make_request('studentsignup', req.body, function(err,results){
    console.log('in result');
    console.log(results);
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
module.exports = router;