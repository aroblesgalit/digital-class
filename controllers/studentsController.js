const db = require("../models");

// Defining methods for the studentsController
module.exports = {
    updateStudentsTeachers: function (req, res) {
        db.Student
            .findOneAndUpdate({ _id: req.user._id }, {
                teachers: req.body
            }, { new: true })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getStudentsByTeacher: function (req, res) {
        db.Student
            .find({
                teachers: req.user._id
            })
            .then(dbModels => res.json(dbModels))
            .catch(err => res.status(422).json(err));
    },
    findAll: function (req, res) {
        db.Student
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Student
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Student
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Student
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Student
            .findById({ _id: req.params })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};