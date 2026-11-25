import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/DB.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(express.json());
app.use("/api/auth", authRoutes);


await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});