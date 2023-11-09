require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const UserModel = require("./models/user");
var path = require('path');
const app = express()

// Link JS script and CSS styles to node js
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT;

// Retrieve connection string from .env file
const dbUrl = process.env.SECRET_PASSWORD;

const connectionParams = {
    
};

// general config
app.set('views', __dirname + '/views'); 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(dbUrl, connectionParams).then(()=>{
    console.info("Connected to the DB");
}).catch((e) => {
    console.log("Error:", e);
});

app.listen(PORT,()=>{
    console.log(`Listen on PORT: ${PORT}`)
});

app.post("/register",(req,res)=>{
    const userModel = UserModel(req.body)
    userModel.save()
    res.redirect('/');
});

app.get("/read",(req,res)=>{
    UserModel.find()
    .then((data)=>{
        return res.status(200).send(data)
    })
    .catch((err)=>{
        return res.status(500).send(err)
    })
});

app.get("/", (req, res)=>{
    res.render("index.ejs");
});