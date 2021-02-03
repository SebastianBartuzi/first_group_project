const express = require('express');
const router = express.Router();
const User = require("../models/UserModel");

const {login, register} = require("../controllers/authentication");

router.route("/login").post(login);

router.route("/register").post(register);

module.exports = router;