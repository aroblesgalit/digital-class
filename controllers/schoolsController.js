const db = require("../models");

// Define methods for the schoolsController
module.exports = {
    findAll: function(req, res) {
        db.School
            .find()
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.School
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}