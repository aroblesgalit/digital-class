const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = newSchema({
    name: { type: String, required: true},
    school: { type: String, required: true},
    subject: { type: String, required: true},
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
      },
      password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [({ length }) => length >= 6, "Password should be longer."]
      },
    quizes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Quiz"
        }
    ]
})

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher