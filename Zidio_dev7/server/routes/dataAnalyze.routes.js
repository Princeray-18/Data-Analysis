import express from "express";
import multer from "multer";
import { analyzeExcel } from "../controllers/dataAnalyze.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // save temporarily

router.post("/analyze", upload.single("file"), analyzeExcel);

export default router;
