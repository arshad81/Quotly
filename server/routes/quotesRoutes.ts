import { Router } from "express"
import { Request, Response } from "express";
import { getAllQuotes, getUserQuotes, postQuotes } from "../controllers/quotesController";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();

router.post("/quotes", authMiddleware, postQuotes);
router.get("/", getAllQuotes);
router.get("/user", authMiddleware, getUserQuotes);

export default router;
