const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = newSchema({
    name: { type: String, required: true},
    school: { type: String, required: true},
    subject: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    quizes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Quiz"
        }
    ]
})

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher