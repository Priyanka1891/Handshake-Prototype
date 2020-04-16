"use strict";
const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');
const actions = require('../Utils/constant');
const passport = require('passport');
require('../Utils/passport')(passport);


// post job by employer
router.post('/postjob', passport.authenticate('jwt', { session: false }), function(req,res) {
  // console.log("Req Body post job: ", req.body);
  var msg = { action : actions.POSTJOB , body : req.body};
  kafka.make_request('job', msg, function(err,results){
    console.log('in postjob result ', results);
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


// search jobs with query string
router.post('/jobsearch', passport.authenticate('jwt', { session: false }), function(req,res) {
  console.log("Req Body search job: ", req.body);
  var msg = { action : actions.LISTJOB , body : req.body};
  kafka.make_request('job', msg, function(err,results){
    // console.log('in list job result ', JSON.stringify(results));
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


//students tab to search and look out for other student's profile
router.post('/studentsearch', passport.authenticate('jwt', { session: false }), function(req,res){
  // console.log("Req Body student search: ", req.body);
  var msg = { action : actions.STUDENTSEARCH , body : req.body};
  kafka.make_request('job', msg, function(err,results){
    // console.log('in student search result ', results);
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
        // console.log("Value returned is",JSON.stringify(results.value));
        res.end(JSON.stringify(results.value));
    }           
  });
});

// used by students to apply & search jobs applied
router.post('/jobsapplied', passport.authenticate('jwt', { session: false }),function(req,res) {
  var msg = { action : actions.JOBSAPPLIED , body : req.body};
  kafka.make_request('job', msg, function(err,results){
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


router.post('/jobsappliedstudent', passport.authenticate('jwt', { session: false }),function(req,res) {
  var msg = { action : actions.JOBSAPPLIEDSTUDENT , body : req.body};
  kafka.make_request('job', msg, function(err,results){
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


// Students applied for the particular job
router.post('/studentsapplied',passport.authenticate('jwt', { session: false }),function(req,res) {
  var msg = { action : actions.STUDENTAPPLIED , body : req.body};
  kafka.make_request('job', msg, function(err,results){
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

router.post('/updatejobstatus',passport.authenticate('jwt', { session: false }),function(req,res) {
  var msg = { action : actions.UPDATEJOBSTATUS , body : req.body};
  kafka.make_request('job', msg, function(err,results){
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






module.exports = router;

