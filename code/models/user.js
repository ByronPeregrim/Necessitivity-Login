const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    /*userID:{
        type:Number,
        required: true,
        trim: true
    }, */
    username:{
        type:String,
        required: true,
        trim: true
    },
    password:{
        type:String,
        required: true,
        trim: true
    },
    first:{
        type:String,
        required: true,
        trim: true
    },
    last:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        trim: true
    },
    feet:{
        type:Number,
        required: true,
        trim: true
    },
    inches:{
        type:Number,
        required:true,
        trim:true
    },
    weight:{
        type:Number,
        required:true,
        trim:true
    }, /*
    accountCreated:{
        type:Date,
        required:true,
        trim:true
    }*/
})

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel