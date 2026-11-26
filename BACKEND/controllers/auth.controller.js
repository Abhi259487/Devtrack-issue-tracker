import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




const signup = async (req, res) => {
    
    try{
        const jwtSecret = process.env.JWT_SECRET;
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        if(await User.findOne({email})){
            return res.status(400).json({message: "Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password:hashedPassword});
        await user.save();
        const token = jwt.sign({id: user._id}, jwtSecret, {expiresIn: "1h"});
        
        
        res.status(201).json({message: "User created successfully", username: user.username, email: user.email, token});
    }
    catch(error){
        res.status(500).json({message: "Error creating user", error: error.message});
    }
}

const login = async (req, res) => {
    try{
        const jwtSecret = process.env.JWT_SECRET;
        const {email, password} = req.body; 
        
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Password is incorrect"});
        }
        const token = jwt.sign({id: user._id}, jwtSecret, {expiresIn: "1h"});
        res.status(200).json({message: "User logged in successfully", username: user.username, email: user.email, token});
    }
    catch(error){
        res.status(500).json({message: "Error logging in", error: error.message});
    }
}

    const getProfile = async (req, res) => {
        try{
            const user = req.user;
            res.status(200).json({message: "User profile fetched successfully", username: user.username, email: user.email});
            
        }
        catch(error){
            res.status(500).json({message: "Error fetching user profile", error: error.message});
        }
    }

export {signup, login, getProfile};