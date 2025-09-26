import { Router } from "express";
import { registerUserRoutes, loginUserRoutes } from "../controllers/authControllers";
import { addSavedQuote, allSavedQuotes, deleteByAdmin, deleteUser, getAllUsers, makeAdmin, removeSavedQuote, revokeAdmin, updatePassword, updateUsername } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
router.post("/register", registerUserRoutes);
router.post("/login", loginUserRoutes);
router.get("/allUsers", authMiddleware, getAllUsers); // Admin can view all users
router.put("/updateUsername", authMiddleware , updateUsername); 
router.delete("/deleteUser", authMiddleware , deleteUser);
router.put("/updatePassword", authMiddleware , updatePassword);
router.delete("/deleteByAdmin/:id", authMiddleware , deleteByAdmin); // Admin can delete any user by ID
router.put("/makeAdmin/:id", authMiddleware , makeAdmin); // Admin can promote user to admin
router.put("/revokeAdmin/:id", authMiddleware , revokeAdmin); // Admin can revoke admin role from user
router.post("/saveQuote/:quoteId", authMiddleware, addSavedQuote); // User can save a quote
router.get("/allSavedQuotes", authMiddleware, allSavedQuotes); // User can view all saved quotes
router.delete("/removeSavedQuote", authMiddleware, removeSavedQuote); // User can remove a saved quote
export default router;  