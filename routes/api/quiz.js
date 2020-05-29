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
    .route("/teacher/:id")
    .get(quizController.getQuizzesForStudent);

router
    .route("/:quizid/:studentid")
    .put(quizController.findByIdAndUpdate);

    module.exports = router;