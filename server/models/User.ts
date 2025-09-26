import mongoose from "mongoose";
export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    role: "user" | "admin";
    saved: mongoose.Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    saved: [ {type: mongoose.Schema.Types.ObjectId, ref: "Quote", default: [] }],
    
});


export const User = mongoose.model<IUser>("User", userSchema);