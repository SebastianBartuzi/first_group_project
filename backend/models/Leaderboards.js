const mongoose = require('mongoose');

const LeaderboardsSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    score: {type: Object, required: true}
});

module.exports = mongoose.model("Leaderboards", LeaderboardsSchema);