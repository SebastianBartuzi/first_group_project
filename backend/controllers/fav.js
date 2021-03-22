const jwt = require('jsonwebtoken');
const User = require('../models/UserModel')

exports.getAllFavs = async (req, res, next) => {
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
        res.status(200).json({"fav": userExists.favArray})
    })
}

exports.addRemoveFav = async (req, res, next) => {
    const { token, fav } = req.body;
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
        console.log(userExists.favArray)
        // if(userExists.favArray == null){
        //     await userExists.updateOne({favArray: fav});
        // }
        var exists = false
        var tempFavArray = userExists.favArray
        tempFavArray.forEach(element => {
            if (element == fav){
                exists = true;
                tempFavArray.splice(tempFavArray.indexOf(element), 1)
            }
        });

        if (exists==false){
            tempFavArray.push(fav)
        }

        await userExists.updateOne({favArray: tempFavArray})
        return res.status(200).json({success: "Success"})

    })
}