const express = require('express');
const router = express.Router();
const util = require('util');
var QUERY_PROMISE;
// var conn = require('../../constants');


fetchEventList = async(name) => {
  let sql = '';
  if (name) {
    sql='SELECT * FROM event_details WHERE companyname=\'' + name + '\' order by eventDate';
  } else {
    sql =  'SELECT * FROM event_details order by eventDate';
  }
  rows = await QUERY_PROMISE(sql);
  return rows;
}

router.post('/list', function(req,res){
  // QUERY_PROMISE = util.promisify(conn.CONNECTION.query).bind(conn.CONNECTION);
  // let promise = fetchEventList(req.body.eventQuery);
  // promise.then((result) => {
  //   res.writeHead(200,{
  //     'Content-Type' : 'text/json'
  //   });
  //   let sql_query_result = JSON.parse(JSON.stringify(rows));
  //   for (idx = 0; idx < sql_query_result.length; ++idx) {
  //     sql_query_result[idx].eventDate = sql_query_result[idx].eventDate.split('T')[0];  
  //   }  
  //   res.end(JSON.stringify(sql_query_result));
  // }).catch((error) => {
  //   console.log(error)
  // });
});

//List student events with post request
router.post('/liststudentevent', function(req,res){
  // console.log("Inside student list event post Request");
  // let sql = 'SELECT * FROM event_details order by eventDate';
  // console.log("Sql is "+sql);
  // conn.CONNECTION.query(sql, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //     res.writeHead(500,{
  //       'Content-Type' : 'text/json'
  //     })
  //     res.end('End Failure');
  //     return;
  //   }
  //   let sql_query_result = JSON.parse(JSON.stringify(result));
  //   for (idx = 0; idx < sql_query_result.length; ++idx) {
  //     sql_query_result[idx].eventDate = sql_query_result[idx].eventDate.split('T')[0];  
  //   }  
  //   //console.log("Query output is : "+JSON.stringify(sql_query_result));
  //   res.end(JSON.stringify(sql_query_result));
  // });
}); 

//Register student event with post request
router.post('/registerstudentevent', function(req,res){
  // console.log("Inside student register event post Request");
  // let sql = 'insert into event_registered (username,eventID) values(\'' 
  // + req.body.username +'\',\'' +req.body.eventId+'\')'; 
  // conn.CONNECTION.query(sql, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //     res.writeHead(500,{
  //       'Content-Type' : 'text/json'
  //     })
  //     res.end('End Failure');
  //     return;
  //   }
  // });
  // sql = 'update event_details set username=\'' 
  // + req.body.username +'\' where eventId = \'' +req.body.eventId+'\''; 
  // // console.log("Sql is "+sql);
  // conn.CONNECTION.query(sql, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //     res.writeHead(500,{
  //       'Content-Type' : 'text/json'
  //     })
  //     res.end('End Failure');
  //     return;
  //   }
  //   //console.log("Query O/p is"+JSON.stringify(result)); 
  //   res.end(JSON.stringify(result));
  // });
}); 


//Register student event with post request
router.post('/listregisterstudentevent', function(req,res){
  // console.log("Inside list student register event post Request "+req.body.username);
  // let sql = 'select * from event_details where username=\'' + req.body.username+'\' order by eventDate';
  // console.log("Sql is "+sql);
  // conn.CONNECTION.query(sql, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //     res.writeHead(500,{
  //       'Content-Type' : 'text/json'
  //     })
  //     res.end('End Failure');
  //     return;
  //   }
  //   // console.log("Query O/p is"+JSON.stringify(result));
  //   let sql_query_result = JSON.parse(JSON.stringify(result));
  //   for (idx = 0; idx < sql_query_result.length; ++idx) {
  //     sql_query_result[idx].eventDate = sql_query_result[idx].eventDate.split('T')[0];  
  //   } 
  //   res.end(JSON.stringify(sql_query_result));
  // });
}); 


// post event by employer
router.post('/postevent',function(req,res) {
  // console.log("Req Body post event: ", req.body);
  // let join_values = '\',\'';
  // let sql = 'INSERT INTO event_details (eventTitle, eventDate, eventDetail, eventLocation, companyname)' +
  //           ' VALUES(\'' + req.body.eventTitle + join_values + req.body.eventDate + join_values + req.body.eventDetail + join_values
  //           + req.body.eventLocation + join_values + req.body.companyName +'\')';
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


// Students registered for the particular event
router.post('/studentsregistered',function(req,res) {
  // console.log("Req Body Students applied: ", req.body);
  // let sql = 'SELECT * from event_registered WHERE eventid=\'' + req.body.eventId + '\'';
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