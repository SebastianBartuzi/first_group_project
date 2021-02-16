const Calendar = require("../models/CalendarModel");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.addMood = (req, res, next) => {
    const { token, data } = req.body;

    if(!token || !data)
        res.status(400).json({error: "Something went wrong"});

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
            const dateExists = await Calendar.findOne({"userID": id});

            if(dateExists){
                await dateExists.updateOne({"moodArray": data});
            }
            else{
                const calendar = await Calendar.create({
                    "userID": id,
                    "moodArray": data
                });
            }

            res.status(200).json({success: "Data succesfully added"});
            }catch(error){
                res.status(400).json({error: error.message});
            }

    });
}

exports.getMood = (req, res, next) => {
    const { token } = req.body;

    if(!token)
        res.status(400).json({error: "Something went wrong"});

    jwt.verify(token, process.env.JWT_SECRET, async function(err, decodedToken){
        if(err){
            return res.status(400).json({error: "Expired Link"});
        }
        const { id } = decodedToken;

        const userExists = await User.findOne({_id: id});
        if(!userExists)
            return res.status(400).json({error: "User does not exist!"});

        try{
            const data = await Calendar.find({"userID": id});
            res.status(200).send(data[0].moodArray);

        }catch(error){
            res.status(400).json({error: error.message});
        }

    });
}