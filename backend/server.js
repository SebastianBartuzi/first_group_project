const express = require('express');
const app = express();
const mongoose=require('mongoose');

const PORT = process.env.PORT || 3000;

// Connect to DB
mongoose.connect('mongodb+srv://Admin:Password1@projecthappy.y224t.mongodb.net/ProjectHappy?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

app.get('/', (req,res)=>{
    res.send("Project Happy");
})