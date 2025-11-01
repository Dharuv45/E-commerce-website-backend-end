import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import cors from "cors"; 
import dataBase from "./config/database.js";
import routerCategory from "./routes/category-routes.js";
import routerProduct from "./routes/product-routes.js";
import routerUser from "./routes/user_routes.js";
import routerreview from "./routes/product-reviews-routes.js"
import routerCart from "./routes/cart-routes.js";
import routerrandom from "./routes/get-random-product-routes.js";
import routerPayment from "./routes/payment-routes.js";
import router from "./routes/Address-routes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Define the correct CORS configuration
const corsOptions = {
  // Use the specific origin of your frontend application
  // Replace 'http://localhost:5173' with your actual frontend URL if different
  origin: "http://localhost:5173", 
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply the configured CORS middleware
app.use(cors(corsOptions));

const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
  console.log("Created 'uploads' folder");
}

app.use("/uploads_product_img", express.static("uploads_product_img"));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/category", routerCategory);
app.use("/api/product", routerProduct);
app.use("/api/user", routerUser);
app.use("/api/review", routerreview);
app.use("/api/cart", routerCart);
app.use("/api/random", routerrandom);
app.use("/api/payment", routerPayment);
app.use("/api/address", router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
