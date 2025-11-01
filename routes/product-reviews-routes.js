import express from "express";
import { getReviews, createReview, getoneReviers , updatereviews, deletereviews, getProductReviews} from "../controllers/product-reviews-controllers.js";
import { validatereviews } from "../validations/authValidationsreviews.js";
import verifyToken  from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/getreviews", getReviews);
router.get("/product-reviews", getProductReviews);


router.post("/create", validatereviews, verifyToken,createReview);
router.get("/getone/:id", getoneReviers);
router.put("/update/:id", verifyToken, updatereviews);
router.delete("/delete/:id", verifyToken,deletereviews);
export default router;