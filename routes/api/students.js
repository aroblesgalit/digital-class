const router = require("express").Router();
const studentsController = require("../../controllers/studentsController");

// Match with "/api/students"
router
    .route("/")
    .get(studentsController.findAll)
    .post(studentsController.create)

router
    .route("/teacher")
    .get(studentsController.getStudentsByTeacher)
    .put(studentsController.updateStudentsTeachers);

// Matches with "/api/students/:id"
router
    .route("/:id")
    .get(studentsController.findById)
    .put(studentsController.update)
    .delete(studentsController.remove);
    
module.exports = router;