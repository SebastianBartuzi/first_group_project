const express = require('express');
const router = express.Router();

const { getLeaderboards, updateLeaderboards, getAllScores } = require("../controllers/leaderboards");

router.route("/getleaderboards").post(getLeaderboards);

router.route("/updateleaderboards").post(updateLeaderboards);

router.route("/getallscores").post(getAllScores);

module.exports = router;