const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const teacherSchema = newSchema({
    type: { type: String },
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


teacherSchema.pre("save", async function save(next) {  
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
      return next();
  }
  try {
      // generate a salt
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      // hash the password along with the new salt
      this.password = await bcrypt.hash(this.password, salt);
      return next();
  } catch (err) {
      return next(err);
  }
});

teacherSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password); 
};


const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher