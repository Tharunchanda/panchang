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
    <nav className="bg-white shadow rounded mb-6 px-4 py-3 flex items-center justify-between">
      <div className="text-xl font-bold text-blue-700">
        <Link to="/">Panchang</Link>
      </div>
      <div className="flex gap-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Calendar</Link>
        {user ? (
          <>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">{user.name}'s Profile</Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            <Link to="/signup" className="text-gray-700 hover:text-blue-600 font-medium">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;