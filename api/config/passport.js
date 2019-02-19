'use strict';

const passport = require('passport');
const User = require("../models/user");
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function () {

    console.log("passport config");

    passport.use(new FacebookStrategy({
            clientID: "587721945080110",
            clientSecret: "my-secret",
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            console.log("creating user");
            User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                console.log("user is creating");
                console.log(user);
                return cb(err, user);
            });
        }
    ));

};
