const router = require("express").Router();
const schoolsController = require("../../controllers/schoolsController");

// Matches with "/api/schools"
router
    .route("/")
    .get(schoolsController.findAll)
    .post(schoolsController.create);

router
    .route("/:query")
    .get(schoolsController.findByQuery);

module.exports = router;