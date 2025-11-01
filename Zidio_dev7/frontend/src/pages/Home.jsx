// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // install lucide-react for icons
import Navbar from "./Navbar";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d0d2b] text-white flex flex-col">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-snug">
          Analyze And Explain <br />
          Your Data With Beautiful Visualizations.
        </h1>
        <p className="max-w-2xl text-gray-300 mb-4 text-sm sm:text-base">
          A platform to automate the complete data analysis life-cycle. Upload your raw data, 
          create summary analysis and explain through world-class visuals. Customize, 
          personalize and download in multiple formats.
        </p>
        <p className="font-semibold text-yellow-400 mb-8 text-sm sm:text-base">
          No Code | No Installation | Just a Browser
        </p>

        <Link
          to="/data-analyzer"
          className="bg-cyan-400 text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-300 transition text-sm sm:text-base"
        >
          Data Analyzer
        </Link>

        <p className="mt-4 text-xs sm:text-sm text-gray-400 max-w-md">
          Create personalized interactive bespoke visualization with unmatched flexibility.
        </p>
      </main>

      {/* Visualization Images Section */}
      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 sm:px-10 mb-16 w-full">
        <div className="bg-gray-800 rounded-xl h-40 flex items-center justify-center">📊</div>
        <div className="bg-gray-800 rounded-xl h-40 flex items-center justify-center">📈</div>
        <div className="bg-gray-800 rounded-xl h-40 flex items-center justify-center">📉</div>
        <div className="bg-gray-800 rounded-xl h-40 flex items-center justify-center">🥧</div>
        <div className="bg-gray-800 rounded-xl h-40 flex items-center justify-center">📌</div>
        <div className="bg-gray-800 rounded-xl h-40 flex items-center justify-center">📟</div>
      </section>
    </div>
  );
}
