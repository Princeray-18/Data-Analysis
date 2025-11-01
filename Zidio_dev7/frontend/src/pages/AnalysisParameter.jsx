import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import AnalysisResult from "./AnalysisResult";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ParameterAnalysis = () => {
  const location = useLocation();
  const { file, columns } = location.state || {};
  const [aggregate, setAggregate] = useState("sum");
  const [col1, setCol1] = useState("");
  const [col2, setCol2] = useState("");
  const [col3, setCol3] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  if (!columns) return <p className="text-center mt-10">No columns found. Please upload file again.</p>;

  const generateQuestion = () => {
    let q = "";
    if (aggregate === "count")
      q = `Summarize the count of ${col1} and ${col2} with respect to ${col3}`;
    else if (aggregate === "average")
      q = `How do the average value of ${col1} and ${col2} vary with respect to ${col3}`;
    else
      q = `How do ${col1} and ${col2} vary with respect to ${col3}`;

    setQuestion(q);
    return q;
  };

  const handleAnalyze = async () => {
    const q = generateQuestion();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("query", q);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/data/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data); // save response (aggregator, cells, coordinates, etc.)

    } catch (err) {
      console.error(err);
      alert("Failed to analyze data");
    } finally {
      setLoading(false);
    }
  };

  // prepare chart data if we have result
  let chartData = null;
  if (result?.cells) {
    chartData = {
      labels: result.cells.map((_, i) => `Row ${i + 1}`),
      datasets: [
        {
          label: `${result.aggregator} values`,
          data: result.cells.map((val) => parseFloat(val)),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    };
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-6 text-center">Parameter Selection</h2>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select className="select select-bordered" value={aggregate} onChange={(e) => setAggregate(e.target.value)}>
            <option value="sum">Sum</option>
            <option value="average">Average</option>
            <option value="count">Count</option>
          </select>

          <select className="select select-bordered" value={col1} onChange={(e) => setCol1(e.target.value)}>
            <option value="">Select Column 1</option>
            {columns.map((col, idx) => <option key={idx} value={col}>{col}</option>)}
          </select>

          <select className="select select-bordered" value={col2} onChange={(e) => setCol2(e.target.value)}>
            <option value="">Select Column 2</option>
            {columns.map((col, idx) => <option key={idx} value={col}>{col}</option>)}
          </select>

          <select className="select select-bordered" value={col3} onChange={(e) => setCol3(e.target.value)}>
            <option value="">Select Column 3</option>
            {columns.map((col, idx) => <option key={idx} value={col}>{col}</option>)}
          </select>
        </div>

        {question && <p className="text-gray-700 mb-4 font-medium">Generated Question: <span className="text-blue-600">{question}</span></p>}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {/* Chart Visualization */}
          {result && <AnalysisResult apiResponse={result} />}


      </div>
    </div>
  );
};

export default ParameterAnalysis;
