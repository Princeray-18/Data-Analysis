import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const DataAnalyzer = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return alert("Please upload a file first!");

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // First row contains column names
      const columns = jsonData[0];

      // Navigate to ParameterAnalysis with file + columns
      navigate("/analysis-parameter", {
        state: { file, columns },
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Upload Excel File
        </h1>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          className="w-full border p-2 rounded-md mb-4"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Upload & Analyze
        </button>
      </div>
    </div>
  );
};

export default DataAnalyzer;
