const express = require('express');
const router = express.Router();

const { addRiddle, getRiddle } = require("../controllers/Riddle.js");

router.route("/addriddle").post(addRiddle);

router.route("/getriddle").post(getRiddle);

module.exports = router;