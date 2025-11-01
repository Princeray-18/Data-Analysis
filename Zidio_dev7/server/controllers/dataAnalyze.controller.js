import XLSX from "xlsx";
import fetch from "node-fetch";
import fs from "fs";

export const analyzeExcel = async (req, res) => {
  try {
    // 1. Read uploaded Excel
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    if (!rows.length) {
      return res.status(400).json({ error: "Excel file is empty" });
    }

    // 2. Convert into TAPAS-friendly format
    const table = {};
    Object.keys(rows[0]).forEach((col) => {
      table[col] = rows.map((r) => String(r[col] ?? ""));
    });

    // 3. Get query
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // 4. Call HuggingFace
    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/google/tapas-large-finetuned-wtq",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            table,
            query,
          },
        }),
      }
    );

    const result = await hfResponse.json();

    // 5. Delete temp file
    fs.unlinkSync(req.file.path);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
