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
                // If there is a Student with the given email
            } else {
                // Check if the password matches the one stored
                dbStudent.validatePassword(password)
                    .then((valid) => {
                        // If its valid, then log them in
                        if (valid) {
                            return done(null, dbStudent)
                            // If the password isn't valid, then return incorrect message
                        } else {
                            return done(null, false, {
                                message: "Incorrect password."
                            })
                        }
                    })
            }
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
                // If there is a teacher with the given email
            } else {
                // Check if the password matches the one stored
                dbTeacher.validatePassword(password)
                    .then(valid => {
                        // If its valid, then log them in
                        if (valid) {
                            return done(null, dbTeacher);
                            // If the password isn't valid, then return incorrect message
                        } else {
                            return done(null, false, {
                                message: "Incorrect password."
                            })
                        }
                        
                    })
            }
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