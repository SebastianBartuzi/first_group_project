const User = require("../models/UserModel");
const Poll = require("../models/PoolsModel");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

exports.getPoll = async (req, res, next) => {
    var weekInMilliseconds = 7*24*60*60*1000;

    var currentPoll = await Poll.findOne({});
    if(!currentPoll || (Date.now() - currentPoll.created) >= weekInMilliseconds)
    {
        if(currentPoll)
           await Poll.remove({});

        const data = await fetch('http://polls.apiblueprint.org/questions')
        
        const polls = await data.json();
        const randomPollIndex = Math.floor(Math.random() * polls.length)
        
        const question = polls[randomPollIndex].question;
        const choicesList = polls[randomPollIndex].choices;
        
        var choices = []
        choicesList.forEach(choice => {
            currentChoice = {
                "option": choice.choice,
            }
            choices.push(currentChoice)
        });

        try{
        const poll = await Poll.create({
            "question": question,
            "options": choices,
        });

        
        currentPoll = poll;

        }catch(err){
            res.status(400).json({error: err.message});
        }
    }
    
    var resPackage = {
        "question": currentPoll.question,
        "options": currentPoll.options
    }
    res.status(201).send(resPackage);
}

exports.updatePoll = async (req, res, next) => {
    const {token, answer} = req.body;

    if(!answer)
        res.status(400).json({error: "Answer Not Provided"});

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
            const poll = await Poll.findOne({});
            console.log(poll)

            var voted = false;
            poll.options.forEach(option => {
                if(option.option === answer)
                    voted = true;
            })
            
                const vote = poll.options.map(
                option =>
                  option.option === answer
                    ? {
                        votes: option.votes + 1,
                        _id: option._id,
                        option: option.option,
                      }
                    : option,
              );
            
            if (poll.voted.filter(user => user.toString() === id).length <= 0) {
                if(voted){
                poll.voted.push(id);
                poll.options = vote;
                await poll.save();}
        
                return res.status(202).json(poll);
              } else {
                res.status(500).json({error:'Already voted'});
              }
            }catch(err){
                res.status(400).json({error: err.message});
            }
    
        });
}
