import express from "express";



import { HandleLogin } from "../controllers/authController.js"; // ✅ Add .js extension

const router = express.Router();

router.post("/login", HandleLogin);

export default router;
