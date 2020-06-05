const db = require("../../models");
const passport = require("../../config/passport");
const router = require("express").Router();

router.post("/login", passport.authenticate("teacherLocal"), function (req, res) {
    res.json(req.user);
});

router.post("/signup", function (req, res) {
    db.Teacher.create({
        email: req.body.email,
        password: req.body.password,
        school: req.body.school,
        name: req.body.name,
        subject: req.body.subject
    })
        .then(function (dbTeacher) {
            res.redirect(307, "/api/teacher-login/login");
        })
        .catch(function (err) {
            res.status(401).json(err);
        });
});

// Route for logging user out
router.get("/logout", function (req, res) {
    req.logout();
    req.session.destroy(function (err) {
        res.json({})
    });
});

// Route for getting some data about our user to be used client side
router.get("/user_data", function (req, res) {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user._id,
            name: req.user.name,
            school: req.user.school,
            subject: req.user.subject,
            imageUrl: req.user.imageUrl,
            userType: req.user.userType,
            sharedQuizzes: req.user.sharedQuizzes
        });
    }
});

router.get("/quizzes", function (req, res) {
    db.Quiz
        .find({
            teacher: req.user._id
        })
        .then(dbModels => res.json(dbModels))
        .catch(err => res.status(422).json(err));
});

router.get("/students", function (req, res) {
    db.Student
        .find({
            teachers: req.user._id
        })
        .then(dbModels => res.json(dbModels))
        .catch(err => res.status(422).json(err));
});

router.put("/:id/:quizid", function(req, res) {
    db.Teacher
        .updateOne({ _id: req.params.id }, {
            $pull: { sharedQuizzes: req.params.quizid }
        }, { safe: true, multi: true })
            .then(res => res.json(res))
            .catch(err => res.status(422).json(err));
})

module.exports = router;