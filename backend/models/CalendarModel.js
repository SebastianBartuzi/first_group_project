const mongoose = require('mongoose');

const CalendarSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    date: {type: Date, required: true},
    mood: {type: Number, required: true},
});

CalendarSchema.pre("save", async function(next){
    next();
});

const Calendar = mongoose.model("calendar", CalendarSchema);

module.exports = Calendar;