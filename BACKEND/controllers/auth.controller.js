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
        const token = jwt.sign({id: user._id}, jwtSecret, {expiresIn: "1h"});
        
        await user.save();
        res.status(201).json({message: "User created successfully", username: user.username, email: user.email, token});
    }
    catch(error){
        res.status(500).json({message: "Error creating user", error: error.message});
    }
}

export {signup};