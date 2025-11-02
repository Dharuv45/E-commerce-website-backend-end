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

const Product = mongoose.model("ProductE-com", productSchema);

// Ensure collection exists
const ensureCollectionExists = async () => {
  try {
    // Get the collection name that Mongoose will use
    const collectionName = Product.collection.name || "producte-coms";
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionExists = collections.some(
      (col) => col.name === collectionName
    );

    if (!collectionExists) {
      await mongoose.connection.db.createCollection(collectionName);
      console.log(`Collection '${collectionName}' created successfully`);
    }
  } catch (error) {
    console.error("Error ensuring collection exists:", error);
  }
};

// Call when mongoose is connected
if (mongoose.connection.readyState === 1) {
  ensureCollectionExists();
} else {
  mongoose.connection.once("connected", ensureCollectionExists);
}

export default Product;
