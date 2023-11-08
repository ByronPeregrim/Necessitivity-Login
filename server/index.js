require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express")

const app = express()

const PORT = process.env.PORT;

const dbUrl = process.env.SECRET_PASSWORD;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};


mongoose.connect(dbUrl, connectionParams).then(()=>{
    console.info("Connected to the DB");
}).catch((e) => {
    console.log("Error:", e);
});

app.listen(PORT,()=>{
    console.log(`Listen on PORT: ${PORT}`)
})

app.get("/insert",(req,res)=>{
    
})