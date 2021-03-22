const express = require('express');
const router = express.Router();

const { getAllFavs, addRemoveFav} = require("../controllers/fav");

router.route("/getAllFavs").post(getAllFavs);

router.route("/addRemoveFav").post(addRemoveFav);

module.exports = router;