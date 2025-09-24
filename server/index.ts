import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import qoutesRoutes from "./routes/quotesRoutes";
import quotesRoutes from "./routes/quotesRoutes";

const app: Application = express();
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/quotly", {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/quotes", quotesRoutes);