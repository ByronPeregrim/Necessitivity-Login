require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const UserModel = require("./models/user");
const path = require('path');
const { Admin } = require('mongodb');
const app = express();
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");

// Link JS script and CSS styles to node js
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT;

var userData = null;

// Set up for account recovery emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'necessitivity@gmail.com',
      pass: 'ajjsogsnvjxcpjcz'
    }
  });

// Retrieve connection string from .env file
const dbUrl = process.env.SECRET_PASSWORD;

const connectionParams = {
    
};

// general config
app.set('views', __dirname + '/views'); 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(dbUrl, connectionParams).then(()=>{
    console.info("Connected to the DB");
}).catch((e) => {
    console.log("Error:", e);
});

app.listen(PORT,()=>{
    console.log(`Listen on PORT: ${PORT}`);
});

// Save registration form data to database
app.post("/register",async (req,res)=>{
    // Check username and email for already existing username and email in user database
    const username = await UserModel.exists({
        username:req.body.username
    });
    if (username) {
        // Username exists already, redirect to error page
        console.log("USERNAME EXISTS ALREADY");
        res.redirect('/username-exists-error');
    } else {
        const email = await UserModel.exists({
            email:req.body.email
        });
        if (email) {
            // Email exists already, redirect to error page
            console.log("EMAIL EXISTS ALREADY");
            res.redirect('/email-exists-error');
        }
        else {
            // If username and email does not already exist, add user registration data to MongoDB database
            const userModel = UserModel(req.body);
            userModel.save();
            res.redirect('/registration-successful');
        }
    }
});

// activated when a user enters login credentials on login page and hits submit
app.post("/login-user",async (req,res)=>{
    const userID = await UserModel.exists({
        username: req.body.username
    })
    var enteredPassword = req.body.password;
    const password = await UserModel.find({_id:userID}).select('password -_id');
    var hashedPassword = password[0].password;
    if (await bcrypt.compare(enteredPassword, hashedPassword)) {
        if (userID) {
            const admin_status = await UserModel.find({_id:userID}).select('admin -_id');
            if(admin_status[0].admin){
                // REDIRECT TO ADMIN PAGE HERE ~~~~~~~~~~~~~~
                console.log("Logging in Admin...");
            }else{
                // REDIRECT TO USER PAGE HERE ~~~~~~~~~~~~~~
                const data = await UserModel.find({_id:userID}).select('-_id');
                userData = data[0];
                console.log("Logging in " + userData.username + "...");
                res.redirect('/user-page');
            }
        } else {
            res.redirect('/login-error');
        }
    }
    else {
        res.redirect('/login-error');
        console.log("Password does not match hash.");
    }
    
});

app.post("/recover-account",async (req,res)=>{
    const email = await UserModel.exists({
        email: req.body.email
    });
    // If email address is in database, send recovery email and redirect to success page
    if (email) {
        const userInfo = await UserModel.find({email:req.body.email}).select('username password -_id');
        // Send recovery email
        var mailOptions = {
            from: 'necessitivity@gmail.com',
            to: req.body.email,
            subject: 'Necessitivity - Account Recovery',
            text: 'Username: ' + userInfo[0].username +
                    '\nPassword: ' + userInfo[0].password
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
        res.redirect('/account-recovery-success');
    }
    else { // else redirect to page with error message
        res.redirect('/account-recovery-error');
    }
});

// get functions for page redirects:
app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.get("/login-error", (req, res)=>{
    res.render("login-error.ejs");
});

app.get("/email-exists-error", (req, res)=>{
    res.render("email-exists-error.ejs");
});

app.get("/username-exists-error", (req, res)=>{
    res.render("username-exists-error.ejs");
});

app.get("/registration-successful", (req, res)=>{
    res.render("registration-successful.ejs");
});

app.get("/account-recovery-error", (req, res)=>{
    res.render("account-recovery-error.ejs");
});

app.get("/account-recovery-success", (req, res)=>{
    res.render("account-recovery-success.ejs");
});

app.get("/user-page", (req, res)=>{
    res.render("user-page.ejs", { 
        data : userData
    });
});