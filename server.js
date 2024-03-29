import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors"

//configure env
dotenv.config();

// database config
connectDB();

//api object
const app = express();

//middlewares
app.use(cors())
// including the other domain that can call the api directly
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

// port
const PORT = process.env.PORT || 8080;

//app listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectDB();
  console.log("mongoDB connected");
});
