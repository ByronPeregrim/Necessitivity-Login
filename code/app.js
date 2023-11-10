require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const UserModel = require("./models/user");
var path = require('path');
const { Admin } = require('mongodb');
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
    // Save registration form data to database
    const userModel = UserModel(req.body)
    userModel.save()
    res.redirect('/');
});

app.post("/login-user",async (req,res)=>{
    // Search user database for username/password combination
    const findUserCredentials = await UserModel.exists({
        username: req.body.username,
        password: req.body.password
    })
    if (findUserCredentials) {
        const admin_status = await UserModel.find({_id:findUserCredentials}).select('admin -_id');
        if(admin_status[0].admin){
            // REDIRECT TO ADMIN PAGE 
            console.log("Logging in Admin...");
        }else{
            // REDIRECT TO USER PAGE
            console.log("Logging in User...");
        }
        res.redirect('/');
    } else {
        // REDIRECT TO PAGE WITH LOGIN ERROR
        console.log("FALSE");
        res.redirect('/login-error');
    }
});

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.get("/login-error", (req, res)=>{
    res.render("login-error.ejs");
})

