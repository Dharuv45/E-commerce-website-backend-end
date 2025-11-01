import express from "express";
import multer from "multer";
import { getallProduct, createproduct, getProductById, deleteproduct, updateproduct } from "../controllers/product-controllers.js";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads_product_img");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads_product_img"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploads_product_img = multer({ storage });



const router = express.Router();
router.get("/fetch", getallProduct);
router.post("/createproduct", uploads_product_img.single("image"), createproduct);
router.get("/getone/:id", getProductById);
router.delete("/deleteproduct/:id", deleteproduct);
router.put("/updateproduct/:id", uploads_product_img.single("image"), updateproduct);

export default router;
