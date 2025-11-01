import express from "express";
import { create_payment_intent } from "../controllers/payment-controllers.js";
const router = express.Router();
router.post("/create-payment-intent", create_payment_intent);
export default router;