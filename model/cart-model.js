import mongoose, { Schema, Types } from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity can't be less than 1."],
        },
        name: {
          type: String,
          required: false,
          trim: true,
        },
        image: {
          type: String,
          required: false,
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price can't be negative."],
        },
      },
    ],
    totalProduct: {
      type: Number,
      default: 0,
      min: [0, "Total product count can't be negative."],
    },
    totalAmount: {
      type: Number,
      default: 0,
      min: [0, "Total amount can't be negative."],
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre("save", function (next) {
  this.totalProduct = this.items.reduce((acc, item) => acc + item.quantity, 0);

  this.totalAmount = this.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  next();
});

export default mongoose.model("Cart", cartSchema);
