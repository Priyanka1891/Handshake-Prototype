"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("../../kafka-backend/Utils/config");
const Users = require('../../kafka-backend/Models/UserModel');

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            console.log("JWT PAYLOAD: ". jwt_payload);
            const user_id = jwt_payload._id;
            Users.findById(user_id, (err, results) => {
                console.log("Found user");
                if (err) {
                    console.log("Invalid ", err);
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });