const express = require('express');
const User = require('../models/user-model');

const home = (req, res) => {
    try {
        res.status(200).send("This is Home");
    } catch (error) {
        res.status(error.status)
        console.error(error);
    }
}

const register = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, password } = req.body;
        const userExits = await User.findOne({ email });

        if (userExits) {
            res.status(400).json({ error: "Email already registered" });
            console.log("User is already registered");
            return;
        }

        const data = await User.create({ fullName, phoneNumber, email, password });
        const token = await data.generateToken();

        res.status(201).json({
            msg: "User created successfully",
            token,
            userId: data._id.toString(),
        });
        console.log(data);
    } catch (error) {
        res.status(error.status)
        console.error(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare passwords
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        // Passwords match, generate token and respond
        const token = await user.generateToken();
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = { home, register, login }