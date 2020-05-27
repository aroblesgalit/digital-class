const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    query: {
        type: String
    },
    results: {
        type: Array
    }
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;