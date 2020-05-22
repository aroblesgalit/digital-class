const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = newSchema({
    title: { type: String, required: true},
    school: { type: String, required: true},
    subject: { type: String, required: true},
    timeLimit: { type: Number, required: true},
    questions: [

        {
            question: "",
            choices: ["", "", "", ""],
            answer: ""

        }
    ],
    teacher: [
        {
            type: Schema.Types.ObjectId,
            ref: "Teacher"
        }
    ],
    result: [
        {
            type: Schema.Types.ObjectId,
            ref: "Results"
        }
    ]
})

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz