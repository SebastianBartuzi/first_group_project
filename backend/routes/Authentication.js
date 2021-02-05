const express = require('express');
const router = express.Router();
const User = require("../models/UserModel");

const {login, register, activate, forgotpassword, resetpassword, deleteAccount,
     validateDelete, changemail, changemailRequest, changemailvalidate} = require("../controllers/authentication");

router.route("/login").post(login);

router.route("/register").post(register);

router.route("/activate/:id").post(activate);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:id").put(resetpassword);

router.route("/delete").post(deleteAccount);

router.route("/validateDelete/:id").post(validateDelete);

router.route("/changemail").post(changemail);

router.route("/changemailrequest/:id").post(changemailRequest);

router.route("/changemailvalidate/:id").post(changemailvalidate);

module.exports = router;