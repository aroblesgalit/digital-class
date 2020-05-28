const router = require("express").Router();
const resultsController = require("../../controllers/resultsController");

// Match with "/api/results"
router
    .route("/")
    .get(resultsController.findAll)
    .post(resultsController.create);

// Match with "/api/results/:id"
router 
    .route("/:id")
    .get(resultsController.findById)
    .put(resultsController.update)
    .delete(resultsController.remove);

// Match with "/api/results/:quiz"
router
    .route("/quiz/:quiz")
    .get(resultsController.getResultsByQuiz);

module.exports = router;