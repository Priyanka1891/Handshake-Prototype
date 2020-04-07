"use strict";
const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');



// post event by employer
router.post('/postevent',function(req,res) {
  console.log("Req Body post event: ", req.body);
  kafka.make_request('postevent', req.body, function(err,results){
    console.log('in postevent result ', results);
    if (err){
        console.log("Inside err");
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        })
        res.end("Error");
    } else {
        res.writeHead(results.code, {
            'Content-Type': 'text/plain'
        })
        res.end(results.value);
    }           
  });
});


module.exports = router;