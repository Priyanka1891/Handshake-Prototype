"use strict";
const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');
const actions = require('../Utils/constant');

//events registered

// post event by employer
router.post('/postevent',function(req,res) {
  var msg = { action : actions.POSTEVENT , body : req.body};
  kafka.make_request('event', msg, function(err,results){
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
        res.end(JSON.stringify(results.value));
    }           
  });
});

router.post('/list',function(req,res) {
  var msg = { action : actions.LISTEVENT , body : req.body};
  kafka.make_request('event', msg, function(err,results){
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
        console.log('in list event send result ', results);
        res.end(JSON.stringify(results.value));
    }           
  });
});


module.exports = router;