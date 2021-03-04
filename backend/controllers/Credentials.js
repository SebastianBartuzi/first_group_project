const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.getCredentials = (req, res, next) => {
    const {token} = req.body;

    if(!token)
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
            const username = userExists.username;
            const email = userExists.email;

            console.log(username)
            console.log(email)

            res.status(200).json({"username": username, "email": email});
            }catch(error){
                res.status(400).json({error: error.message});
            }

    });
}