import express from "express";
import connectDB from "./config/DB.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});