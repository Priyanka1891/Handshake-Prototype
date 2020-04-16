"use strict";
const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');
const actions = require('../Utils/constant');
const passport = require('passport');
require('../Utils/passport')(passport);


// post event by employer
router.post('/postevent', passport.authenticate('jwt', { session: false }),function(req,res) {
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

router.post('/list', passport.authenticate('jwt', { session: false }), function(req,res) {
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

router.post('/listregisteredstudent', passport.authenticate('jwt', { session: false }), function(req,res) {
  var msg = { action : actions.LISTREGISTEREDSTUDENT , body : req.body};
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


router.post('/registeredstudenteventlist', passport.authenticate('jwt', { session: false }), function(req,res) {
  var msg = { action : actions.REGISTERSTUDENTEVENTLIST , body : req.body};
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


router.post('/registeredstudentlist', passport.authenticate('jwt', { session: false }), function(req,res) {
  var msg = { action : actions.REGISTEREDSTUDENTLIST , body : req.body};
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