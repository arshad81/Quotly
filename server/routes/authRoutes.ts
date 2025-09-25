import { Router } from "express";
import { registerUserRoutes, loginUserRoutes } from "../controllers/authControllers";
import { deleteByAdmin, deleteUser, getAllUsers, makeAdmin, revokeAdmin, updatePassword, updateUsername } from "../controllers/userController";
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
export default router;  