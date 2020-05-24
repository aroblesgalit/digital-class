const router = require("express").Router();
const studentsController = require("../../controllers/studentsController");

// Match with "/api/students"
router
    .route("/")
    .get(studentsController.findAll)
    .post(studentsController.create)
    .get(studentsController.findByEmail);

// Matches with "/api/students/:id"
router
    .route("/:id")
    .get(studentsController.findById)
    .put(studentsController.update)
    .delete(studentsController.remove);

module.exports = router;