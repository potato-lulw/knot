import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

// register user

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            gender,
            pronouns,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            gender,
            pronouns,
            email,
            password : passHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile : 100,
            impressions: 100
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({error: error.message});

    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({msg: "User does not exist. "});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({msg: "Invalid password. "});
        }

        const token = jwt.sign({id: user._id}, process.env.JWTSECRET)
        res.status(200).json({token, user});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}