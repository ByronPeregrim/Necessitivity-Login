const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

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
    },
    age:{
        type:Number,
        required:true,
        trim:true
    },
    admin: { //true if user has admin priveleges.
        type:Boolean,
        required:true,
        trim:true,
        default:false
    },
    accountCreated:{
        type:Date,
        required:true,
        trim:true,
        default:new Date().toISOString()
    }
})

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (error) {
      return next(error);
    }
});

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel