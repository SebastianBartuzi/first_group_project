const express = require('express');
const router = express.Router();

const { getCredentials } = require("../controllers/Credentials");

router.route("/getcredentials").post(getCredentials);

module.exports = router;