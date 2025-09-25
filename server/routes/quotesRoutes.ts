import { Router } from "express"
import { Request, Response } from "express";
import { changeAuthorName, getAllQuotes, getUserQuotes, postQuotes } from "../controllers/quotesController";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();

router.post("/", authMiddleware, postQuotes);
router.get("/", getAllQuotes);
router.get("/user", authMiddleware, getUserQuotes);
router.put("/authorName", authMiddleware, changeAuthorName);

export default router;
