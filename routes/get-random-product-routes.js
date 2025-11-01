import express from "express";
import {fetch, randomproduct} from "../controllers/random-product-controllers.js"
const router = express.Router();
router.get("/get", fetch)
router.get("/random", randomproduct)


export default router;  