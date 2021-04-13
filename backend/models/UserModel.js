const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: [true, "Please Enter a Username"]},
    email: {type: String, required: [true, "Please Enter an Email"], match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please Provide a Valid Email!"]},
    password: {type: String, required: [true, "Please Enter a Password"], minlength: 6, select: false},
    favArray: [{type: String, default: null}],
    resetPasswordToken: {type: String},
});

UserSchema.pre("save", async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
});

UserSchema.methods.passwordMatch = async function(password){
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    return resetToken;
}

UserSchema.methods.getToken = async function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });
}

const User = mongoose.model("user", UserSchema);

module.exports = User;