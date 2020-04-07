const { secret } = require('../Utils/config');
const { Users} = require('../Models/UserModel');
const CryptoJS = require('crypto-js');

function handle_request(msg, callback){
    Users.findOne({ username: msg.username}, (error, user) => {
      var res = {};
      // console.log("User details are ", user);
        if (error) {
            res.code = 500;
            res.value = "Error occured";
            callback(null, res);
        }
        if (user) {
            var dcPasswd = CryptoJS.AES.decrypt(user.password, secret);
            dcPasswd = dcPasswd.toString(CryptoJS.enc.Utf8);
            console.log("Password compare signin :" ,dcPasswd , msg.password)
            if (dcPasswd != msg.password && msg.editmode) {
                res.code = 401;
                res.value = "Invalid password";
                callback(null, res);
                return;
            }
            res.code = 200;
            res.details = user;
            callback(null, res);
        }
        else {
            res.code = 401;
            res.value = "Invalid Credentials";
            callback(null, res);
        }
    });
}

// async function handle_details(value){
//   try
//   {
//     // const basicdetails = await basic_details(value);basicdetails,
//     const educationdetails = await education_details(value);
//     // const experiencedetails = await experience_details(value);,experiencedetails
//     return [ educationdetails];
//   }
//   catch(error){
//     console.log("Some error occurred", error);
//   }
// }

// basic_details = (value) => {
//   console.log("Reached inside details function ",value.toString());
//   return new Promise((resolve,reject) => 
//     studentDetails.findOne({user_id: value.toString()}, (error, data) => {
//     console.log("basic_details ", data, studentDetails);
//     if (data) {
//         resolve(data)
//     }
//     else{
//         reject(error)
//       }
//   }));
// }

// education_details = (value) => {
//   console.log("Reached inside edu. details function ",value.toString());
//   return new Promise((resolve,reject) => 
//     studentEducation.find({}, (error, data) => {
//     console.log("education_details ", data, studentEducation);
//     if (data) {
//         resolve(data)
//     }
//     else{
//         reject(error)
//       }
//   }));
// }

// experience_details = (value) => {
//   console.log("Reached inside  exp. details function ",value.toString());
//   return new Promise((resolve,reject) => 
//     studentExperience.findOne({user_id: value.toString()}, (error, data) => {
//     if (data) {
//         resolve(data)
//     }
//     else{
//         reject(error)
//       }
//   }));
// }

exports.handle_request = handle_request;