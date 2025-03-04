const express = require('express');
const app = express();
const path = require('path')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');

app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_CONNECT,
     {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
     (err) => {
         if(err) return console.error(err);
         console.log("Connected to the database");
     });

app.get('/api/test', (req,res)=>{
    res.send("Test");
});

const server = app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

process.on("unhandledRejection", (err, promise) =>{
    console.log("Error: " + err);
    server.close(() => process.exit(1));   
})

// Set up routes
app.use('/', express.static(path.join(__dirname,'../frontend/build')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

app.use("/api/authentication" ,require('./routes/Authentication'));
app.use("/api/moodcalendar" ,require('./routes/MoodCalendar'));
app.use("/api/polls" ,require('./routes/Polls'));
app.use("/api/riddle" ,require('./routes/Riddle'));
app.use("/api/credentials", require('./routes/Credentials'));
app.use("/api/leaderboards", require('./routes/Leaderboards'));
app.use("/api/favs", require('./routes/Favs'));