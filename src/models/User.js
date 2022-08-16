import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';
const UserSchema= new Schema(
    {
        name: {
            type:String,
            trim:true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type:String,
            required: true,
        },
        date:{
            type: Date,
            default: Date.now
        },
    },
    {
        timestamps:true,
        versionKey: false
    }
);