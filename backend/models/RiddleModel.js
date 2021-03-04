const mongoose = require("mongoose");

const RiddleSchema = new mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
    date: {type: Date, default: null}
})

module.exports = mongoose.model("Riddle", RiddleSchema);