"use strict";
const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');


//Route to handle Post Request Call
router.post('/post',(req,res) => {  
  kafka.make_request('messages', req.body, function(err,results){
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
module.exports = router;