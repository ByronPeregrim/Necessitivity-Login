import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    /*userID:{
        type:Number,
        required: true,
        trim: true
    }, */
    username:{
        type:String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
        trim: true,
        select: false,
    },
    first:{
        type:String,
        required: true,
        trim: true,
    },
    last:{
        type:String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required: true,
        trim: true,
        select: false,
        unique: true,
    },
    weight:{
        type:Number,
        required:true,
        trim:true,
    },
    admin: { //true if user has admin priveleges.
        type:Boolean,
        required:true,
        trim:true,
        default:false,
    },
    workouts:{
        type:Array<unknown>,
        required:true,
        trim:true,
        default:[]
    }
}, { timestamps: true });

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);