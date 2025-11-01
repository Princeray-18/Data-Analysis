import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import mongodb from "./db/connectToMongoDB.js";

import authRoutes from "./routes/auth.routes.js";
import dataAnalyzeRoutes from "./routes/dataAnalyze.routes.js";
import cors from "cors"

const PORT = process.env.PORT || 6000;

const app = express();

// connect DB
mongodb();

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/data", dataAnalyzeRoutes);

app.listen(PORT, () => {
  console.log("✅ Server is running on port", PORT);
});
