const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    teachers: {
        type: Array
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String,
        required: true,
        validate: [({ length }) => length >= 6, "Password should be longer."]
    },
    imageUrl: {
        type: String
    }

});

studentSchema.pre("save", async function save(next) {  
    // only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
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

studentSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password); 
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;