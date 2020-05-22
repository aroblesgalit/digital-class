const router = require("express").Router();
const bookRoutes = require("./books");
const studentRoutes = require("./students");
const resultRoutes = require("./results");
const studentLoginRoutes = require("./studentLogin");

// Book routes
router.use("/books", bookRoutes);
router.use("/students", studentRoutes);
router.use("/results", resultRoutes);
router.use("/student-login", studentLoginRoutes);

module.exports = router;
