import express from "express";
import { loginUser, registerUser } from "../controllers/userController";

const router = express.Router();

// login route
router.post("/login", loginUser);

// register route
router.post("/register", registerUser);

export default router;
