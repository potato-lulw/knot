import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        min: 2,
        max: 20,
        required: true,
    },
    lastName: {
        type: String,
        min: 2,
        max: 20,
        required: true,
    },
    gender:{
        type: String,
    },
    pronouns: {
        type: String,
    },
    email: {
        type: String,
        min: 5,
        max: 20,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        min: 5,
        max: 20,
        required: true,
    },
    picturePath: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: []
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
    
}, {timestamps: true});


const User = mongoose.model("User", UserSchema);

export default User;