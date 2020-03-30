const express = require('express');
const router = express.Router();
// var conn = require('../../constants');

var editUserDetailsSqlQuery = (req) => {
  var keys = '', values = '';
  var detalis_keys, table_name;
  if (req.body.edit_details) {
    table_name = 'student_details';
    detalis_keys = ['username','name','city','state','country','dob','objective','contactno']
  } else if (req.body.edit_education_details) {
    table_name = 'student_education_details';
    detalis_keys = ['username','location','degree','major','yearofpassing','cgpa']
  } else if (req.body.edit_experience_details) {
    table_name = 'student_experience_details';
    detalis_keys = ['username','companyname','title','companylocation','startdate','enddate','jobdetails','skills']
  } else {
    throw Error("edit table type not found")
  }

  for (let [key, value] of Object.entries(req.body.details)) {
    if (detalis_keys.includes(key)) {
      keys = keys + ',' + key;
      values = values + ',\'' + value + '\'';
    }
  }
  let sql = 'INSERT INTO ' + table_name + ' (' + keys.slice(1) + ') VALUES(' + values.slice(1) + ')';
  if (req.body.edit_education_details) {
    sql = sql + '; UPDATE student  SET colgname=\'' + req.body.details.colgname + '\' WHERE username=\''
                +  req.body.details.username + '\'';
  }
  console.log("Edit student details sql ", sql);
  return sql
}

router.post('/editstudentdetails', function(req, res) {
  var  table_name;
  if (req.body.edit_details) {
    table_name = 'student_details';
  } else if (req.body.edit_education_details) {
    table_name = 'student_education_details';
  } else if (req.body.edit_experience_details) {
    table_name = 'student_experience_details';
  } else {
    throw Error("edit table type not found")
  }

  var sql = 'DELETE FROM ' + table_name + ' WHERE username=\''+ req.body.details.username + '\'';
  // conn.CONNECTION.query(sql, function(err, row) {
  //   if (err) {
  //     console.log(err); 
  //   }
  //   sql = editUserDetailsSqlQuery(req);
  //   conn.CONNECTION.query(sql, function(err, result) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.writeHead(200,{
  //       'Content-Type' : 'text/json'
  //     });
  //     res.end("Student Details submitted");
  //   });
  // });
});

module.exports = router;