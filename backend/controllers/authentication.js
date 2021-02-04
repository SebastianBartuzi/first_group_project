const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../helpers/sendEmail");
const crypto = require("crypto");

exports.login = async (req, res, next) => {
    const {username, password} = req.body;
    
    if(!username || !password)
        return res.status(400).json({error: "Wrong username/password!"});
    
    try{
        const userExists = await User.findOne({username}).select("+password");
        
        if(!userExists)
            return res.status(404).json({error: "Wrong username/password!"});
        
        const userValid = await userExists.passwordMatch(password);

        if(!userValid)
            return res.status(404).json({error: "Wrong username/password!"});
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
        return res.status(400).json({error: "Email already in use!"});

    let token = jwt.sign({username, email, password}, process.env.JWT_SECRET, {expiresIn: '20min'});

    //Add the account to the database
    // try{
    //     const user = await User.create({
    //         username,
    //         email,
    //         password,
    //     });

    //     sendToken(user, 201, res);

    try{
        console.log(token);
    await sendEmail({
        target: email,
        subject: "Activate account",
        text: `
        <p> Please enter to this link to activate your email </p>
        <form method="post" action="${process.env.CLIENT_URL}/api/authentication/activate/${token}">
        <input type="submit" text="a"/>
        </form>
        `});
    res.send("Email has been sent");
    }catch(err)
    {
        return res.status(500).json({error: err.message});
    }

}

exports.activate = async (req, res, next) =>{
    const url = req.url;
    const urls = url.split("/");
    const token = urls.slice(-1)[0];

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async function(err, decodedToken){
            if(err){
                return res.status(400).json({error: "Expired Link"});
            }
            const {username, email, password} = decodedToken;

            const userExists = await User.findOne({email});
            if(userExists)
                return res.status(400).json({error: "Email already in use!"});

            //Add the account to the database
            try{
                const user = await User.create({
                    username,
                    email,
                    password,
        });
        console.log(username);
            sendToken(user,201,res);
        }catch(err)
        {res.status(400).json({error:err.message})}
    });
    }else{
        return res.json({error: "Something went wrong!"});
    }
}

exports.forgotpassword = async (req, res, next) =>{
    const {username} = req.body;
    
    try{
        const userExists = await User.findOne({username});
        
        if(!userExists)
            res.status(400).json({error: "User don't exists"});

        const resetToken = await userExists.getResetPasswordToken();
        
        await userExists.save();

        try{
            const url = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;
            sendEmail({
                target: userExists.email,
                subject: "Reset Password",
                text: `
                <p> Please enter to this link to reset your password </p>
                <a href=${url} clicktracking=off> Reset Password </a>                
                `
            })
            res.status(200).json({success: "Email sent"});
        }catch(err){
            userExists.resetToken = undefined;
            await userExists.save()
            res.status(400).json({error: err.message});
        }

    }catch(error){
        res.status(400).json({error: error.message});
    }
}

exports.resetpassword = async (req, res, next) => {
    const url = req.url;
    const urls = url.split("/");
    const resetToken = urls.slice(-1)[0];
    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    try{
        const userExists = await User.findOne({resetPasswordToken});
        if (!userExists)
            res.status(400).json({error: "User not found"});
        
        userExists.password = req.body.password;
        userExists.resetPasswordToken = undefined;
        
        await userExists.save();

        res.status(201).json({success: true, data: "Password Reseted"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const sendToken = async (user, statusCode, res) => {
    const token = await user.getToken();
    return res.status(statusCode).json({token: token});
}