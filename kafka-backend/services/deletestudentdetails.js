const { Users } = require('../Models/UserModel');


function deleteExperience(data,callback){
    var res = {};
      Users.updateOne({}, {$pull : {studentExperience : {_id : data.index}}} ,(error,data) => {
        if (error) {
          res.code = 500;
          res.value=error;
          callback(null, res);
        }
        else {
          res.code = 200;
          res.value = "Experience Deleted successfully";
          callback(null, res);
        }
      });     
}

function deleteEducation(data,callback){
  var res = {};
    Users.updateOne({}, {$pull : {studentEducation : {_id : data.index}}} ,(error,data) => {
      if (error) {
        res.code = 500;
        res.value=error;
        callback(null, res);
      }
      else {
        res.code = 200;
        res.value = "Education Deleted successfully";
        callback(null, res);
      }
    });     
}


function handle_request(data, callback){
  if (data.delete_experience_details) {
    deleteExperience(data, callback);
    return;
  }
  else if(data.delete_education_details){
    deleteEducation(data, callback);
    return;
  }
}

exports.handle_request = handle_request;