const router = require("express").Router();
const bookRoutes = require("./books");
const studentRoutes = require("./students");

// Book routes
router.use("/books", bookRoutes);
router.use("/students", studentRoutes);

module.exports = router;
