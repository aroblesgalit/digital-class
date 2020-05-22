const router = require("express").Router();
const bookRoutes = require("./books");
const studentRoutes = require("./students");
const resultRoutes = require("./results");

// Book routes
router.use("/books", bookRoutes);
router.use("/students", studentRoutes);
router.use("/results", resultRoutes);

module.exports = router;
