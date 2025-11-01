import express from "express";
import { create } from "../controllers/cart-controllers.js";
import verifyToken from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create", verifyToken, create);
export default router;