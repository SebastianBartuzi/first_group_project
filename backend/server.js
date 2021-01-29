const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

app.get('/', (req,res)=>{
    res.send("Project Happy");
})