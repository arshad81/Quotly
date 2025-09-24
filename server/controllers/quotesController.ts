import { Request, Response } from "express";
import { Quote } from "../models/Quote";
import AuthRequest from "../types/AuthRequest";

interface PostQouoteBody {
    text: string;
}

export const postQuotes = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const quote = await Quote.create({
        text: req.body.text,
        author: req.user.username,
    });
    res.status(201).json({ message: "Quote created", quote: quote.toObject(), user: req.user.toObject() });
}

export const getAllQuotes = async (req: Request, res: Response) => {
    try {
        const quotes = await Quote.find().sort({ createdAt: -1 });
        res.status(200).json({ quotes });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const getUserQuotes = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const quotes = await Quote.find({ author: req.user.username }).sort({ createdAt: -1 });
        res.status(200).json({ quotes });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}