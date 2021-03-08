const express = require('express');
const router = express.Router();

const { getLeaderboards, updateLeaderboards } = require("../controllers/leaderboards");

router.route("/getleaderboards").post(getLeaderboards);

router.route("/updateleaderboards").post(updateLeaderboards);

module.exports = router;