//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const { mongoDB, frontendURL } = require('../kafka-backend/Utils/config');
var cors = require('cors');

// Route path handlers student specific
const Student = require('./routes/Student');
const Employer = require('./routes/Employer');
const Jobs = require('./routes/Jobs');
const Events = require('./routes/Events');
const Messages = require('./routes/Messages');

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

app.use(bodyParser.json({ limit: '50MB' }));
// app.use(express.json({limit: '50mb', extended: true}));
// app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use('/employer', Employer);
app.use('/student', Student);
app.use('/jobs', Jobs);
app.use('/events', Events);
app.use('/messages', Messages);

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', frontendURL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
  
//start your server on port 3001
app.listen(3001);
console.log("Handshake server running on port 3001");