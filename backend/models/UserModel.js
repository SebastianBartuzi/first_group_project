const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: [true, "Please Enter a Username"]},
    email: {type: String, required: [true, "Please Enter an Email"], match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please Provide a Valid Email!"]},
    password: {type: String, required: [true, "Please Enter a Password"], minlength: 6, select: false},
});

UserSchema.pre("save", async function(next){
    if(this.isModified("password"))
    {
        const salt = 15;
        this.password = bcrypt.hashSync(this.password, salt);
        next();
    }
    next();
});

UserSchema.methods.passwordMatch = async function(password){
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getToken = async function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });
}

const User = mongoose.model("user", UserSchema);

module.exports = User;