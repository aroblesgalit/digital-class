const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeworkSchema = new Schema({
    title: { type: String, required: true },
    timeLimit: { type: Number, required: true },
    questions: [

        {
            id: { type: Number },
            question: { type: String },
            choices: { type: Array },
            answer: { type: Number },
            imageUrl: {type: String}

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
    ],
    
})

const Homework = mongoose.model("Homework", homeworkSchema);

module.exports = Homework