const Riddle = require("../models/RiddleModel");

exports.addRiddle = async (req, res, next) => {
    const {newQuestion, newAnswer} = req.body;

    if(!newQuestion || !newAnswer)
        res.status(400).json({error: "Empty fields"});

    try{
        const riddle = await Riddle.create({
            "question": newQuestion,
            "answer": newAnswer,
        });
        res.status(201).json({success: "Riddle added"});

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

exports.getRiddle = async (req, res, next) => {
    //var dayInMilliseconds = 24*60*60*1000;
    var dayInMilliseconds = 60*1000;

    const currentRiddle = await Riddle.findOne({ date: { "$ne": null }});
    if(currentRiddle != null && (Date.now() - currentRiddle.date) >= dayInMilliseconds)
        await currentRiddle.updateOne({date: null});

    if(!currentRiddle || (Date.now() - currentRiddle.date) >= dayInMilliseconds){
        const newRiddle = await Riddle.aggregate([{ $sample: { size: 1 } }]);
        await Riddle.findOne({_id: newRiddle[0]._id}).updateOne({date: Date.now()});
        res.status(200).send(newRiddle);
    }
    else
        res.status(200).send(currentRiddle);
}