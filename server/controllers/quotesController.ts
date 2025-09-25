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
        authorId: req.user._id,
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
        const quotes = await Quote.find({ authorId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ quotes });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteQuote = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const quoteId = req.params.id;
        const quote = await Quote.findById(quoteId);
        if (!quote) {
            return res.status(404).json({ message: "Quote not found" });
        }
        if (quote.authorId !== req.user._id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }
        await Quote.findByIdAndDelete(quoteId);
        res.status(200).json({ message: "Quote deleted successfully" });
    } catch (error) {
        
    }
}