import mongoose from "mongoose";

interface IQuote {
    author: string;
    authorId?: string;
    text: string;
    createdAt: Date;
}

const quoteSchema = new mongoose.Schema<IQuote>({
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Quote = mongoose.model<IQuote>("Quote", quoteSchema);
