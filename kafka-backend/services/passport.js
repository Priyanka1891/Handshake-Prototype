const { Users } = require('../Models/UserModel');
 
function handle_request(msg, callback) {
  var res = {};

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
};

exports.handle_request = handle_request;