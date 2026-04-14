import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : { 
        type: String,
        required: [true, 'User name is Required'],
        minlength: 2,
        trim : true
        },
    email : { 
        type: String,
        required: [true, 'User email is Required'],
        unique: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"]
        },
    password : { 
        type: String,
        required: [true, 'User password is Required'],
        minlength: 6,
        }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;