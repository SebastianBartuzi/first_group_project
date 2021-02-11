const express = require('express');
const router = express.Router();
const Calendar = require("../models/CalendarModel");

const { addMood, getMood } = require("../controllers/MoodCalendar.js");

router.route("/addmood").post(addMood);

router.route("/getmood").post(getMood);

module.exports = router;