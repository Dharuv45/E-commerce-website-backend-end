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
const allowedOrigins = [
  "https://e-commerce-website-front-end-dun.vercel.app",
  process.env.FRONTEND_URL,
  process.env.CORS_ORIGIN,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean); // Remove any undefined/null values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // For development, allow any localhost origin
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
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
