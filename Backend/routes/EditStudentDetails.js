const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');
const { checkAuth } = require('../Utils/passport');

//Route to handle Post Request Call
router.post('/editstudentdetails', (req, res) => {
  console.log("Reached Here ");
  kafka.make_request('editstudentdetails', req.body, function(err,results){
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