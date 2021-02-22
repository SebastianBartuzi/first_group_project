const express = require('express');
const { route } = require('./Authentication');
const router = express.Router();

const {getPoll, updatePoll} = require("../controllers/Polls");

router.route("/getpoll").post(getPoll);

router.route("/updatepoll").post(updatePoll);

module.exports  = router;