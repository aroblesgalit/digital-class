const router = require("express").Router();
const bookRoutes = require("./books");
const studentRoutes = require("./students");
const resultRoutes = require("./results");
const studentLoginRoutes = require("./studentLogin");
const teacherLoginRoutes = require("./teacherLogin");
const quizRoutes = require("./quiz");
const schoolRoutes = require("./schools");
const teacherRoutes = require("./teachers")

// Routes
router.use("/students", studentRoutes);
router.use("/results", resultRoutes);
router.use("/student-login", studentLoginRoutes);
router.use("/teacher-login", teacherLoginRoutes);
router.use("/quizzes", quizRoutes);
router.use("/schools", schoolRoutes);
router.use("/teachers", teacherRoutes)

module.exports = router;
