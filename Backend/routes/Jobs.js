"use strict";
const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');
const actions = require('../Utils/constant');


// post job by employer
router.post('/postjob',function(req,res) {
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
router.post('/jobsearch',function(req,res) {
  console.log("Req Body search job: ", req.body);
  var msg = { action : actions.LISTJOB , body : req.body};
  kafka.make_request('job', msg, function(err,results){
    console.log('in list job result ', results);
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
router.post('/studentsearch', function(req,res){
  console.log("Req Body student search: ", req.body);
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
        res.end(JSON.stringify(results.value));
    }           
  });
});

// used by students to search jobs applied
router.post('/jobsapplied',function(req,res) {
  // console.log("Inside jobs applied Post Request");
  // var data_insert = false;
  // let sql = 'INSERT INTO jobs_applied (jobid,username) VALUES(\'' 
  //       + req.body.jobId +'\',\'' +req.body.username+'\')';
  // conn.CONNECTION.query(sql, function (err, result) {
  //   if (err) {
  //     console.log("Data insertion failed"+err)
  //     res.writeHead(500,{
  //       'Content-Type' : 'text/json'
  //     })
  //     res.end('End Failure');
  //     return;
  //   }
  //   res.writeHead(200,{
  //     'Content-Type' : 'text/json'
  //   })
  //   let response_data = JSON.stringify({data_inserted : true});
  //   res.end(response_data);
  // });
});


// Students applied for the particular job
router.post('/studentsapplied',function(req,res) {
  // console.log("Req Body Students applied: ", req.body);
  // let sql = '';
  // if (req.body.status) {
  //   sql =  'UPDATE jobs_applied SET status=\'' + req.body.status + '\' WHERE username=\'' + req.body.username + '\';';
  // } 
  // sql =  sql + 'SELECT * from jobs_applied WHERE jobid=\'' + req.body.jobId + '\'';
  // conn.CONNECTION.query(sql, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //     res.writeHead(500,{
  //       'Content-Type' : 'text/json'
  //     })
  //     res.end('End Failure');
  //     return;
  //   }

  //   res.writeHead(200,{
  //     'Content-Type' : 'text/json'
  //   })
  //   let response_data = JSON.stringify(result);
  //   res.end(response_data);
  // });
});





module.exports = router;

