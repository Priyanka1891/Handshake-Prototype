//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const { mongoDB, frontendURL } = require('./Utils/config');
var cors = require('cors');

// Route path handlers student specific
const StudentSignUp  = require('./routes/StudentSignUp');
const StudentSignIn = require('./routes/StudentSignIn');
const EditStudentDetails = require('./routes/EditStudentDetails');
const Jobs = require('./routes/Jobs');
const Events = require('./routes/Events');


// Route path handler employer specific
const EmployerSignUp = require('./routes/EmployerSignUp');
const EmployerSignIn = require('./routes/EmployerSignIn');
const EditEmployerDetails = require('./routes/EditEmployerDetails');


app.set('view engine', 'ejs');

app.use(cookieParser());

//use cors to allow cross origin resource sharing
app.use(cors({ origin: frontendURL, credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.json());

// Student specifice routes
app.use('/', StudentSignUp);
app.use('/', StudentSignIn);
app.use('/', EditStudentDetails);
app.use('/jobs', Jobs);
app.use('/events', Events);

// Employer specific routes
app.use('/', EmployerSignIn);
app.use('/', EmployerSignUp);
app.use('/', EditEmployerDetails);

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', frontendURL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

console.log("MongoDB:", mongoDB);

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});
  
//start your server on port 3001
app.listen(3001);
console.log("Handshake server running on port 3001");