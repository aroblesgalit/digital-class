const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const isEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

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
        type: Array,
        // Foreign Key
    },
    email: {
        type: String,
        required: true,
        validate: [
            isEmail,
            "invalid email"
        ],
        createIndexes: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    }

});

studentSchema.pre("save", async function save(next) {  
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

studentSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password); 
};


const Student = mongoose.model("Student", studentSchema);

module.exports = Student;