import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false,
    trim: true,
    default: null,
    },
  phonenumber: {
    type: Number,
    required: false,
    default: null,
  },
  gender: {
    type: String,
    required: false,
    default: null,
  },
  address: {
    type: String,
    required: false,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("usere-comm", userSchema);




