const User = require("../models/UserModel");

exports.login = async (req, res, next) => {
    const {username, password} = req.body;
    
    if(!username || !password)
        return res.status(400).json({error: "Please enter your username or password!"});
    
    try{
        const userExists = await User.findOne({username}).select("+password");
        
        if(!userExists)
            return res.status(404).json({error: "Wrong username or password"});
        
        const userValid = await userExists.passwordMatch(password);

        if(!userValid)
            return res.status(404).json({error: "Wrong username or password"});
        else
            sendToken(userExists, 200, res);
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}

exports.register = async (req, res, next) => {
    const {username, email, password} = req.body;

    // Check if there aren't any other accounts with the same email
    const userExists = await User.findOne({email});
    if(userExists)
        return res.status(400).json({error: "There exists a user with the same email!"});

    // Add the account to the database
    try{
        const user = await User.create({
            username,
            email,
            password,
        });

        sendToken(user, 201, res);

    }catch(err){
        return res.status(500).json({error: err.message});
    }
}

const sendToken = async (user, statusCode, res) => {
    const token = await user.getToken();
    return res.status(statusCode).json({token: token});
}