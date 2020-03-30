const express = require('express');
const router = express.Router();
// var conn = require('../../constants');

// var editUserDetailsSqlQuery = (req) => {
//   var  col_value = '';
//   var detalis_keys, table_name;
//   if (req.body.edit_details) {
//     table_name = 'employer';
//     detalis_keys = ['name','location','description','contactno']
//   } else {
//     throw Error("edit table type not found")
//   }

//   for (let [key, value] of Object.entries(req.body.details)) {
//     if (detalis_keys.includes(key)) {
//       col_value =  col_value + key + '=' + '\'' + value + '\',';
//     }
//   }
//   let sql = 'UPDATE ' + table_name + ' SET ' + col_value.slice(0,-1) + ' WHERE companyname=\''+ req.body.details.companyname + '\'';
//   console.log("Edit employer details sql ", sql);
//   return sql
// }

router.post('/editemployerdetails', function(req, res) {
  // console.log("Edit employer details:", req.body);
  // sql = editUserDetailsSqlQuery(req);
  // conn.CONNECTION.query(sql, function(err, result) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.writeHead(200,{
  //     'Content-Type' : 'text/json'
  //   });
  //   res.end("Employer Details submitted");
  // });
});

module.exports = router;