
const Quiz = require("../models/Quiz")
exports.getScores= async (req, res, next) => {
    const {username, category, score} = req.body;
    const  scores = await Quiz.find({"scores": score})
    const  usernames = await Quiz.find({"usernames": username})
    const  categorys = await Quiz.find({"category": category})}
