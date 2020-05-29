const router = require("express").Router();
const teachersController = require("../../controllers/teachersController");

// Match with "/api/teachers"
router
    .route("/")
    .get(teachersController.findAll)
    .post(teachersController.create);

// Matches with "/api/teachers/:id"
router
    .route("/:id")
    .get(teachersController.findById)
    .put(teachersController.update)
    .delete(teachersController.remove);

router 
    .route("/school/:school")
    .get(teachersController.getTeachersBySchool);

module.exports = router;
