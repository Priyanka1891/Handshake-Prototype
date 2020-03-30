const express = require('express');
const router = express.Router();
// var conn = require('../../constants')

// search jobs with query string
router.post('/jobsearch', function(req,res){
  console.log("Inside job search post Request", req.body);
  let jobarr = null;
  let sql = null;
  if (req.body.jobQuery) {
    jobarr = req.body.jobQuery.split("\,");
    sql =  'SELECT * FROM job_details WHERE companyname like \'\%' + jobarr[0] + '\%\'' + ' or jobTitle like \'\%' + jobarr[0] + '\%\' order by enddate';
    console.log(sql);
  } else {
    sql = 'SELECT * FROM job_details order by enddate'
  }
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
  //     sql_query_result[idx].createdate = sql_query_result[idx].createdate.split('T')[0];  
  //     sql_query_result[idx].enddate = sql_query_result[idx].enddate.split('T')[0];  
  //   }  

  //   if (!jobarr) {
  //     res.end(JSON.stringify(sql_query_result));
  //     return;
  //   }

  //   let filtered_result = [];
  //   for (idx = 0; idx < sql_query_result.length; ++idx) {
  //     let row = JSON.stringify(sql_query_result[idx]);
  //     let found = true;
  //     for (i =1; i < jobarr.length; ++i) {
  //       if(!row.includes(jobarr[i])) {
  //         found = false;
  //       }
  //     }
  //     if (found) {
  //       filtered_result.push(JSON.parse(row));
  //     }
  //   }
  //   res.end(JSON.stringify(filtered_result));
  // });
}); 


// used by students to search jobs applied
router.post('/jobsapplied',function(req,res) {
  console.log("Inside jobs applied Post Request");
  var data_insert = false;
  let sql = 'INSERT INTO jobs_applied (jobid,username) VALUES(\'' 
        + req.body.jobId +'\',\'' +req.body.username+'\')';
  conn.CONNECTION.query(sql, function (err, result) {
    if (err) {
      console.log("Data insertion failed"+err)
      res.writeHead(500,{
        'Content-Type' : 'text/json'
      })
      res.end('End Failure');
      return;
    }
    res.writeHead(200,{
      'Content-Type' : 'text/json'
    })
    let response_data = JSON.stringify({data_inserted : true});
    res.end(response_data);
  });
});


// Students applied for the particular job
router.post('/studentsapplied',function(req,res) {
  console.log("Req Body Students applied: ", req.body);
  let sql = '';
  if (req.body.status) {
    sql =  'UPDATE jobs_applied SET status=\'' + req.body.status + '\' WHERE username=\'' + req.body.username + '\';';
  } 
  sql =  sql + 'SELECT * from jobs_applied WHERE jobid=\'' + req.body.jobId + '\'';
  conn.CONNECTION.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.writeHead(500,{
        'Content-Type' : 'text/json'
      })
      res.end('End Failure');
      return;
    }

    res.writeHead(200,{
      'Content-Type' : 'text/json'
    })
    let response_data = JSON.stringify(result);
    res.end(response_data);
  });
});



// post job by employer
router.post('/postjob',function(req,res) {
  console.log("Req Body post job: ", req.body);
  let join_values = '\',\'';
  let sql = 'INSERT INTO job_details (jobTitle, createdate, enddate, jobLocation, salary, jobDescription, jobCategory, companyname)' +
            ' VALUES(\'' + req.body.jobTitle + join_values + req.body.createDate + join_values + req.body.endDate + join_values
            + req.body.jobLocation + join_values +  req.body.jobSalary +  join_values + req.body.jobDescription + join_values 
            + req.body.jobCategory + join_values + req.body.companyName +'\')';
  
  conn.CONNECTION.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.writeHead(500,{
        'Content-Type' : 'text/json'
      })
      res.end('End Failure');
      return;
    }

    res.writeHead(200,{
      'Content-Type' : 'text/json'
    })
    let response_data = JSON.stringify(result);
    res.end(response_data);
  });
});


// employer search students with query string
router.post('/studentsearch', function(req,res){
  console.log("Inside student search post Request", req.body);
  let jobarr = null;
  let sql = null;
  if (req.body.studentQuery) {
    jobarr = req.body.studentQuery.split("\,");
    sql =  'SELECT * FROM student_experience_details WHERE skills like \'\%' + jobarr[0] + '\%\'' + ' or title like \'\%' + jobarr[0] + '\%\'';
    console.log(sql);
  } else {
    res.end("Query is Empty");
    return;
  }
  conn.CONNECTION.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.writeHead(500,{
        'Content-Type' : 'text/json'
      })
      res.end('End Failure');
      return;
    }
    res.end(JSON.stringify(result));
  });
}); 

module.exports = router;

