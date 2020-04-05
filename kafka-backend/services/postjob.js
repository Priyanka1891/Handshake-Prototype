const { Jobs } = require('../Models/JobModel');
 
function handle_request(msg, callback){
    console.log("Job post Req Body : ", msg);
    var res = {};

    var newJob = new Jobs({
      title : msg.title,
      createdate : msg.createdate,
      enddate : msg.enddate,
      location : msg.location,
      salary : msg.salary,
      description : msg.description,
      type : msg.type,
      createdby : msg.companyname
    });
    
    newJob.save((error, data) => {
      if (error) {
        res.code = 401;
        res.value=error;
        callback(null, res);
      }
      else {
        res.code = 200;
        res.value = "Job posted successfully";
        callback(null, res);
      }
    }); 
}

exports.handle_request = handle_request;
