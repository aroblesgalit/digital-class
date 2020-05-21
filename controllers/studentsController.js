const db = require("../models");

// Defining methods for the studentsController
module.exports = {
    findAll: function(req, res) {
        db.Student
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};