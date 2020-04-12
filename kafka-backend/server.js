var connection =  new require('./kafka/Connection');
const { mongoDB } = require('./Utils/config');

//topics files
var SignIn = require('./services/signin.js');
var StudentSignUp = require('./services/studentsignup.js');
var EditStudentDetails = require('./services/editstudentdetails.js');
var DeleteStudentDetails = require('./services/deletestudentdetails.js');
var EmployerSignUp = require('./services/employersignup');
var EmployerSignIn = require('./services/employersignin');
var EditEmployerDetails = require('./services/editemployerdetails');
var Job = require('./services/job');
var Event = require('./services/event');
var Messages = require('./services/messages');
var Passport = require('./services/passport')

function handleTopicRequest(topic_name,fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

const mongoose = require('mongoose');
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("signin", SignIn);
handleTopicRequest("studentsignup", StudentSignUp);
handleTopicRequest("editstudentdetails", EditStudentDetails);
handleTopicRequest("deletestudentdetails", DeleteStudentDetails);

handleTopicRequest("employersignup", EmployerSignUp);
handleTopicRequest("employersignin", EmployerSignIn);
handleTopicRequest("editemployerdetails", EditEmployerDetails);
handleTopicRequest("job", Job);
handleTopicRequest("event", Event);

handleTopicRequest("messages", Messages);
handleTopicRequest("passport", Passport);
