const db = require("../../models");
const passport = require("../../config/passport");
const router = require("express").Router();

router.post("/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

router.post("/signup", function(req, res) {
        db.Student.create({
            email: req.body.email,
            password: req.body.password,
            school: req.body.school,
            name: req.body.name,
            teachers: req.body.teachers
        })
            .then(function(dbStudent) {
                // res.redirect(307, "/student/login");
                res.json(dbStudent);
            })
            .catch(function(err) {
                console.log(err);
                res.status(401).json(err);
            });
    });

    // Route for logging user out
router.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    })

    // Route for getting some data about our user to be used client side
router.get("/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

module.exports = router;