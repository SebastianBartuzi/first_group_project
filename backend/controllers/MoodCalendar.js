const Calendar = require("../models/CalendarModel");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.addMood = (req, res, next) => {
    const { token, date, mood } = req.body;

    if(!token || !date || !mood)
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
            storedDate = new Date(date);
            
            const dateExists = await Calendar.findOne({date: storedDate});

            if(dateExists){
                await dateExists.updateOne({"mood": mood});
            }
            else{
                const calendar = await Calendar.create({
                    "userID": id,
                    "date": storedDate,
                    "mood": mood
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
            var data = [];
            const dates = await Calendar.find({"userID": id});

            dates.forEach(element => {
                var newData = {
                    "date": element.date,
                    "mood": element.mood
                };
                data.push(newData);
            });
            res.status(200).send(data);

        }catch(error){
            res.status(400).json({error: error.message});
        }

    });
}