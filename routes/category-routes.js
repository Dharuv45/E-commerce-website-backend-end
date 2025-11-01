import express from "express";
import multer from "multer";
import { addcategory, getallCategory, getoneCategory, deleteCategory, updateCategory } from "../controllers/category-controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


router.post("/addcategory", upload.single('image'), addcategory);
router.get("/getall", getallCategory);
router.get("/getone/:id", getoneCategory);
router.delete("/delete/:id", deleteCategory);
router.put("/update/:id", upload.single('image'), updateCategory);


export default router;
