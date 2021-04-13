const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')
const Leaderboards = require('../models/Leaderboards')

exports.getAllScores = async (req, res, next) => {
    //const { category } = req.body;
    const scoresList = await Leaderboards.find({});

    var allList = [];
    scoresList.forEach(element => {
        var item = element.score;
        allList.push(item);
    });
    return res.status(200).json({allList});
}

exports.getLeaderboards = async (req, res, next) => {
   
    const { token } = req.body;
    if(!token)
        return res.status(400).json({"error": "Something went wrong!"})

    jwt.verify(token, process.env.JWT_SECRET, async function(err, decodedToken){
        if(err){
            return res.status(400).json({error: "Expired Link"});
        }
        const { id } = decodedToken;
        console.log(id);
    
        const userExists = await User.findOne({_id: id});
        if(!userExists)
            return res.status(400).json({error: "User does not exist!"});
        console.log(userExists)
    
        try{
            const leaderboardsExists = await Leaderboards.findOne({userID: id})
            if(!leaderboardsExists){
                try{
                    var scores = {
                        "Books": 0,
                        "Film": 0,
                        "Music": 0,
                        "Television": 0,
                        "Video Games": 0,
                        "Science": 0,
                        "Computer Science": 0,
                        "Mathematics": 0,
                        "Sports": 0,
                        "Geography": 0,
                        "History": 0,
                        "Politics": 0,
                        "Art": 0,
                        "Celebrities": 0,
                        "Animals": 0,
                        "General Knowledge": 0
                    };

                    const leaderboards = await Leaderboards.create({
                    "userID": id,
                    "score": scores
                });
                return res.status(200).json({scores});
            }catch(error){
                return res.status(400).json({error: error.message});
            }
            }else{
                try{
                    const scores = leaderboardsExists.score;
                    return res.status(200).json({scores});
                }catch(error){
                    return res.status(400).json({error: error.message});
                }
            }

            }catch(error){
                return res.status(400).json({error: error.message});
            }

    });

    
} 

exports.updateLeaderboards = async (req, res, next) => {
    const { token, score, category } = req.body;
    
    if(!token)
        return res.status(400).json({"error": "Something went wrong!"})

    jwt.verify(token, process.env.JWT_SECRET, async function(err, decodedToken){
        if(err){
            return res.status(400).json({error: "Expired Link"});
        }
        const { id } = decodedToken;
        console.log(id);
    
        const userExists = await User.findOne({_id: id});
        if(!userExists)
            return res.status(400).json({error: "User does not exist!"});
        console.log(userExists)
    
        try{
            const leaderboardsExists = await Leaderboards.findOne({userID: id})
            if(!leaderboardsExists){
                try{
                    var scores = {
                        "Books": 0,
                        "Film": 0,
                        "Music": 0,
                        "Television": 0,
                        "Video Games": 0,
                        "Science": 0,
                        "Computer Science": 0,
                        "Mathematics": 0,
                        "Sports": 0,
                        "Geography": 0,
                        "History": 0,
                        "Politics": 0,
                        "Art": 0,
                        "Celebrities": 0,
                        "Animals": 0,
                        "General Knowledge": 0
                    };
        
                    Object.keys(scores).forEach(function(key) {
                        if(key.toString() == category)
                            scores[key] = score;
                    });

                    const leaderboards = await Leaderboards.create({
                    "userID": id,
                    "score": scores
                });
                return res.status(200).json({success: "Data succesfully added"});
            }catch(error){
                return res.status(400).json({error: error.message});
            }
            }else{
                try{
                    const scores = leaderboardsExists.score;

                    Object.keys(scores).forEach(function(key) {
                        if(key.toString() == category)
                            scores[key] = Math.max(score, scores[key]);
                    });

                    await leaderboardsExists.updateOne({score: scores});
                    return res.status(200).json({success: "Data succesfully updated"});
                }catch(error){
                    return res.status(400).json({error: error.message});
                }
            }

            }catch(error){
                return res.status(400).json({error: error.message});
            }

    });
} 