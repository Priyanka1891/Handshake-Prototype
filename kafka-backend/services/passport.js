const { Users } = require('../Models/UserModel');
const { Employers } = require('../Models/EmployerModel');
 
function handle_request(msg, callback) {
  var res = {};

  Employers.findOne({id:msg}, function(err, user) {
    if (err) {
      callback(null, false);
    }
    if (user) {
      callback(null, user);
      return;
    }
    Users.findOne({ id: msg }, function (err, user) {
      if (err) {
        callback(null, false);
      }
      if (user) {
        callback(null, user);
      } else {
        callback(null, false);
      }
    }); 
  });
};

exports.handle_request = handle_request;