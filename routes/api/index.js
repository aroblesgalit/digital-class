const router = require("express").Router();
const bookRoutes = require("./books");
const studentRoutes = require("./students");
const resultRoutes = require("./results");
const studentLoginRoutes = require("./studentLogin");
const teacherLoginRoutes = require("./teacherLogin");
const quizRoutes = require("./quiz");

// Book routes
router.use("/books", bookRoutes);
router.use("/students", studentRoutes);
router.use("/results", resultRoutes);
router.use("/student-login", studentLoginRoutes);
router.use("/teacher-login", teacherLoginRoutes);
router.use("/quizzes", quizRoutes);

module.exports = router;
