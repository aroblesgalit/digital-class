const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: { type: String, required: true },
    timeLimit: { type: Number, required: true },
    questions: [

        {
            id: { type: Number },
            question: { type: String },
            choices: { type: Array },
            answer: { type: Number }

        }
    ],
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "Teacher"
    },
    results: [
        {
            type: Schema.Types.ObjectId,
            ref: "Result"
        }
    ]
})

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz