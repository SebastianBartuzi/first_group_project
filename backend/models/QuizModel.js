

const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    username: {type: String, required: true},
    category:{type:String,required:true},
    score:Number
});
QuizSchema.pre("save", async function(next){
    next();
});
const Quiz = mongoose.model("quiz", QuizSchema);
module.exports = Quiz;