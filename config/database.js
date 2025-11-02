import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
console.log("MONGO_URL", MONGO_URL);


mongoose
  .connect(MONGO_URL)
  .then(() => {
  console.log(`Connected to MongoDB ${MONGO_URL}`);
}) 
.catch((err) => {
    console.log(`Error connecting to MongoDB: ${err.message}`);
});

// Export default to allow importing in index.js
export default mongoose;
