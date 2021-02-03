const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.protect = async (req, res, next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return next(res.status(400).json({error: "Not Authorised"}));
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decode.id);

        if(!user)
            return next(res.status(400).json({error: "Invalid Token"}));
        
        req.user = user;
        next();
    }catch(err){
        console.log(err)
        return next(res.status(500).json({error: err.Message}))
    }
}