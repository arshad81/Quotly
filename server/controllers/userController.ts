import { Express, Request, Response } from "express";
import AuthRequest from "../types/AuthRequest";
import { User } from "../models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const updateUsername = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const { newUsername } = req.body;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const userNameExists = await User.findOne({ username: newUsername });
        if (userNameExists) {
            return res.status(400).json({ message: "Username already taken" });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, { username: newUsername }, { new: true });
        res.status(200).json({ message: `Username updated with ${newUsername} and id ${userId}`, user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteUser = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const updatePassword = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const { newPassword } = req.body;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
        res.status(200).json({ message: "Password updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}