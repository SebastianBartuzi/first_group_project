const express = require('express');
const router = express.Router();
const {getScores}= require("../controllers/quiz");
router.route("/getScores").post(getScores);
module.exports = router;