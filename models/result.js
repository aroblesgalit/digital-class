const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    answers: {
        type: Array,
        required: true
    },
    quiz: {
        type: Schema.Types.ObjectId,
        ref: "Quiz"
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    }

});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;