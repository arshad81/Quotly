import { Express, Request, Response } from "express";
import AuthRequest from "../types/AuthRequest";
import { User } from "../models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Quote } from "../models/Quote";

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
    const username = req.user?.username;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        await User.findByIdAndDelete(userId);
        await Quote.deleteMany({ authorId: userId }); // Delete all quotes by the user
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

export const deleteByAdmin = async (req: AuthRequest, res: Response) => {
    const userId = req.params.id;
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await User.findByIdAndDelete(userId);
        await Quote.deleteMany({ authorId: user._id }); // Delete all quotes by the user
        res.status(200).json({
            message: `User '${user.username}' and their quotes deleted successfully`
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const makeAdmin = async (req: AuthRequest, res: Response) => {
    const userId = req.params.id;
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { role: "admin" }, { new: true });
        res.status(200).json({ message: "User promoted to admin successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const getAllUsers = async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const revokeAdmin = async (req: AuthRequest, res: Response) => {
    const userId = req.params.id;
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { role: "user" }, { new: true });
        res.status(200).json({ message: "Admin role revoked successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const addSavedQuote = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const quoteId = req.body.quoteId;
        const userId = req.user.id;
        const updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { saved: quoteId } }, { new: true });
        res.status(200).json({ message: "Quote saved successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const allSavedQuotes = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate("saved");
        console.log("User's saved quotes:", user);
        res.status(200).json({ savedQuotes: user?.saved || [] });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const removeSavedQuote = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const quoteId = req.body.quoteId;
        const userId = req.user.id;
        const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { saved: quoteId } }, { new: true });
        res.status(200).json({ message: "Quote removed from saved successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}