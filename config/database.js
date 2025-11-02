import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, { dbName: 'ecommerc' })
  .then(() => {
  console.log(`Connected to MongoDB database 'ecommerc'`);
}) 
.catch((err) => {
    console.log(`Error connecting to MongoDB: ${err.message}`);
});

// Export default to allow importing in index.js
export default mongoose;
