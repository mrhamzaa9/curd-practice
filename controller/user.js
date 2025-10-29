const bcrypt = require('bcrypt');
const User = require("../model/user");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

// signup new user
const addUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        if (!name || !email || !password || !age) {
            return res.status(400).json({ error: "All fields are required" });
        }
         const existingUser = User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }
        const hashedPassword = await bcrypt.hash(password, 10)
        newUser = new User({ name, email, password: hashedPassword, age });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", newUser });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
//  get all user info
const getUser =async (req,res)=>{
    try{    
    const users =await User.find()
    res.status(200).json(users)
    }
    catch(error){
             return res.status(500).json({ error: "Internal Server Error" });   
    }
}




module.exports = { addUser ,getUser}