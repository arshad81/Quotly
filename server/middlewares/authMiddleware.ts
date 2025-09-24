import express, { Express } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import AuthRequest from "../types/AuthRequest";

export const authMiddleware = async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
    let token ;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, "your_jwt_secret") as { id: string };
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
}