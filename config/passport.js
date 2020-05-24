const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// Tell passport we want to use a Local Strategy.
// Meaning, we want to login with an email and password
passport.use("studentLocal", new LocalStrategy(
    // Our use will sign in using an email, rather than a "username"
    {
        usernameField: "email"
    },
    function(email, password, done) {
        // When a user tries to log in, find it from the Student db
        db.Student.findOne({
            email: email
        }).then(function(dbStudent) {
            // If there's no such Student with the given email
            if (!dbStudent) {
                return done(null, false, {
                    message: "Incorrect email."
                });
                // If there is a Student with the given email, but the password does not match
            } else if (!dbStudent.validatePassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            // If credentials are valid
            return done(null, dbStudent);
        })
    }
));

// Tell passport we want to use a Local Strategy.
// Meaning, we want to login with an email and password
passport.use("teacherLocal", new LocalStrategy(
    // Our use will sign in using an email, rather than a "username"
    {
        usernameField: "email"
    },
    function(email, password, done) {
        // When a user tries to log in, find it from the Student db
        db.Teacher.findOne({
            email: email
        }).then(function(dbTeacher) {
            // If there's no such Student with the given email
            if (!dbTeacher) {
                return done(null, false, {
                    message: "Incorrect email."
                });
                // If there is a Student with the given email, but the password does not match
            } else if (!dbTeacher.validatePassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            // If credentials are valid
            return done(null, dbTeacher);
        })
    }
));

// In order to help keep authentication state across HTTP requests,
// Sequeslize needs to serialize and deserialize the user
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// Export our configured passport
module.exports = passport;