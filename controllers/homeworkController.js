const db = require("../models");

// Defining methods for the homeworkController
module.exports = {
    getHomeworkForStudent: function(req, res) {
        db.Homework
            .find({
                teacher: req.params.id
            })
            .then(dbModels => res.json(dbModels))
            .catch(err => res.status(422).json(err));
    },
    findAll: function(req, res) {
        db.Homework
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // Get Homework by id
    findById: function(req, res) {
        db.Homework
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Homework 
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    update: function(req, res) {
        db.Homework
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByIdAndUpdate: function(req,res) {
        db.Homework
            .findByIdAndUpdate(req.params.quizid, { 
                $push: { students: req.params.studentid}
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Homework
            .findById({ _id: req.params })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }

}