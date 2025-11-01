import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import DataAnalyzer from "./pages/DataAnalyzer";
import AnalysisParameters from "./pages/AnalysisParameter";
import { useAuthContext } from "./context/AuthContext";
import Navbar from "./pages/Navbar";

function App() {
  const { authUser } = useAuthContext();
  return (
   <>
   <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-analyzer" element={<DataAnalyzer />} />
        <Route path="/analysis-parameter" element={<AnalysisParameters />} />

        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
      </Routes>
      </>
   
  );
}

export default App;
