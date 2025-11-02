import express from "express";

import {signup, login, get, refreshTokenHandler, googleLogin} from "../controllers/user-controllers.js"
import { validateSignup } from "../validations/authValidations.js";
import verifyToken from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup",  validateSignup, signup);
router.post("/login",login);
router.get('/get', verifyToken, get)
router.post('/refresh-token', refreshTokenHandler)
router.post("/google-login", googleLogin);

export default router;

