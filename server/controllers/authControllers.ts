import express, { Express, Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUserRoutes = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        let role;
        if (username == "admin"){
            role = "admin"
        }
        else {
            role = "user"
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role: role });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, "your_jwt_secret", { expiresIn: "1h" });
        res.status(201).json({ user: { id: newUser._id, username: newUser.username, role: newUser.role }, token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const loginUserRoutes = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, "your_jwt_secret", { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", user: { id: user._id, username: user.username, role: user.role }, token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}