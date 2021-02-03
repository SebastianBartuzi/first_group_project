const express = require('express');
const router = express.Router();
const User = require("../models/UserModel");

const {login, register, activate} = require("../controllers/authentication");

router.route("/login").post(login);

router.route("/register").post(register);

router.route("/activate/:id").post(activate);

module.exports = router;