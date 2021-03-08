const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')
const Leaderboards = require('../models/Leaderboards')

exports.getAllScores = async (req, res, next) => {
    //const { category } = req.body;
    const scoresList = await Leaderboards.find({});
    console.log(scoresList);

    var allList = [];
    scoresList.Array.forEach(element => {
        var item = element.scores;
        allList.push(item);
    });
    res.status(200).json({allList});

}

exports.getLeaderboards = async (req, res, next) => {
   
    const { token } = req.body;
    if(!token)
        res.status(400).json({"error": "Something went wrong!"})

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
                        "Gaming": 0
                    };

                    const leaderboards = await Leaderboards.create({
                    "userID": id,
                    "score": scores
                });
                res.status(200).json({scores});
            }catch(error){
                res.status(400).json({error: error.message});
            }
            }else{
                try{
                    const scores = leaderboardsExists.score;
                    res.status(200).json({scores});
                }catch(error){
                    res.status(400).json({error: error.message});
                }
            }

            }catch(error){
                res.status(400).json({error: error.message});
            }

    });

    
} 

exports.updateLeaderboards = async (req, res, next) => {
    const { token, score, category } = req.body;
    
    if(!token)
        res.status(400).json({"error": "Something went wrong!"})

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
                        "Gaming": 0
                    };
        
                    Object.keys(scores).forEach(function(key) {
                        if(key.toString() == category)
                            scores[key] = score;
                    });

                    const leaderboards = await Leaderboards.create({
                    "userID": id,
                    "score": scores
                });
                res.status(200).json({success: "Data succesfully added"});
            }catch(error){
                res.status(400).json({error: error.message});
            }
            }else{
                try{
                    const scores = leaderboardsExists.score;

                    Object.keys(scores).forEach(function(key) {
                        if(key.toString() == category)
                            scores[key] = Math.max(score, scores[key]);
                    });

                    await Leaderboards.updateOne({score: scores});
                    res.status(200).json({success: "Data succesfully updated"});
                }catch(error){
                    res.status(400).json({error: error.message});
                }
            }

            }catch(error){
                res.status(400).json({error: error.message});
            }

    });
} 