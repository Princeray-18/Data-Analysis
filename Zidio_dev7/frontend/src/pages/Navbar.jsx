import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
   const { authUser} = useAuthContext();
   const { loading, logout } = useLogout();

  return (

    <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700 text-white bg-[#0d0d2b]">
      <div className="flex items-center space-x-2 text-xl md:text-2xl font-bold">
        <span className="text-cyan-400">XL</span>
        <span>Data Analysis</span>
      </div>

      <ul className="hidden md:flex space-x-6 text-sm font-medium">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/data-analyzer">Data Analyzer</Link></li>
         {authUser ? (
          <>
            <span className="text-sm">Hi, {authUser.fullName}</span>
            <button
              onClick={logout}
              className="px-3 cursor-pointer py-1 bg-red-500 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
       
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>

      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full md:hidden flex flex-col items-center space-y-4 py-6 bg-[#151538] text-sm font-medium z-50">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/data-analyzer" onClick={() => setMenuOpen(false)}>Data Analyzer</Link></li>
          <li><Link to="/Signup" onClick={() => setMenuOpen(false)}>Examples</Link></li>
          <li><Link to="/Login" onClick={() => setMenuOpen(false)}>Help</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
        </ul>
      )}
    </nav>
  );
}
