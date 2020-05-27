const router = require("express").Router();
const quizController = require("../../controllers/quizController");

// Match with "/api/teachers"
router
    .route("/")
    .get(quizController.findAll)
    .post(quizController.create);

// Matches with "/api/teachers/:id"
router
    .route("/:id")
    .get(quizController.findById)
    .put(quizController.update)
    .delete(quizController.remove);

router 
    .route("/teacher")
    .get(quizController.getQuizByTeacher);

    module.exports = router;