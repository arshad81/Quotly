import mongoose from "mongoose";
export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    role: "user" | "admin";
}

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
});



export const User = mongoose.model<IUser>("User", userSchema);