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
        const existingUser = await User.findOne({ email });
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
const getUser = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// login user and assign token
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ message: "EMAIL NOT REGISTER" })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            res.status(401).json({ message: "WRONG PASSWORD" })
        }
        //  assign token
        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });

        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
//delete the user by id
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const users = await User.findByIdAndDelete(id)
        if (!users) {
            res.status(404).send("This user does not exist.")
        }
        res.status(200).send("This user remove.")
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// update the user by id
const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const { name, email, age } = req.body
        const user = await User.findByIdAndUpdate(id, { name, email, age },
            { new: true })
        if (!user) {
            res.status(400).json({ message: 'WRONG ID' })
        }
//again token assign
 const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: 'User updated successfully', user,token });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = { addUser, getUser, loginUser, deleteUser ,updateUser }