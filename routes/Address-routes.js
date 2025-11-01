import express from "express";
import { fetch, addAddress, updateAddress, updateDefaultAddress, deleteAddress } from "../controllers/address-controllers.js";
import { validateAddress } from "../validations/address-validations.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/fetch", verifyToken,fetch);
router.post("/add",verifyToken,addAddress);
router.put("/update/:id", updateAddress);
router.put("/update/default/:id",verifyToken ,updateDefaultAddress);
router.delete("/delete/:id", verifyToken, deleteAddress);



export default router;