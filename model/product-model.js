import mongoose, { Types } from "mongoose";
import validator from "validator";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  totalprice: {
    type: Number,
    required: true,
  },
  discountedprice: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  specifications: {
    type: [String],
    required: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.Mixed,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ProductE-com", productSchema);
