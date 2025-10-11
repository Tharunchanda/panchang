import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-amber-100 shadow-md border-b-2 border-teal-800/20 px-6 py-3 font-serif">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-bold text-teal-900 flex items-center gap-2">
          <span className="text-3xl text-orange-700">🕉️</span>
          Panchangam
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-slate-700 hover:text-amber-600 font-medium transition-colors duration-200">
            Home
          </Link>
          <Link to="/calendar" className="text-slate-700 hover:text-amber-600 font-medium transition-colors duration-200">
            Calendar
          </Link>

          {/* Vertical Separator */}
          <div className="w-px h-6 bg-teal-800/20"></div>

          {user ? (
            // --- Logged In State ---
            <>
              <Link to="/profile" className="text-slate-700 hover:text-amber-600 font-medium transition-colors duration-200">
                {user.name}'s Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-800/10 text-red-800 font-bold rounded-md hover:bg-red-800/20 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            // --- Logged Out State ---
            <>
              <Link to="/login" className="text-slate-700 hover:text-amber-600 font-medium transition-colors duration-200">
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-teal-700 text-white font-bold rounded-md hover:bg-teal-800 transition-colors duration-200 shadow"
              >
                Sign Up
              </Link>              
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;