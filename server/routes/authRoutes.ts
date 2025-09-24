import { Router } from "express";
import { registerUserRoutes, loginUserRoutes } from "../controllers/authControllers";
import { deleteUser, updatePassword, updateUsername } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
router.post("/register", registerUserRoutes);
router.post("/login", loginUserRoutes);
router.put("/updateUsername", authMiddleware , updateUsername); 
router.delete("/deleteUser", authMiddleware , deleteUser);
router.put("/updatePassword", authMiddleware , updatePassword);

export default router;