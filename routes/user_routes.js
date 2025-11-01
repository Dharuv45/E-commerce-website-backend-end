import express from "express";
import { OAuth2Client } from "google-auth-library";

import {signup, login, get, refreshTokenHandler, googleLogin} from "../controllers/user-controllers.js"
import { validateSignup } from "../validations/authValidations.js";
import verifyToken from "../middleware/authMiddleware.js";
const router = express.Router();
const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

router.post("/signup",  validateSignup, signup);
router.post("/login",login);
router.get('/get', verifyToken, get)
router.post('/refresh-token', refreshTokenHandler)
router.post("/google-login", googleLogin);

export default router;

