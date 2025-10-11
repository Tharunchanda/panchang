import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Sign up failed");
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 font-serif">
      <div className="bg-white/80 p-8 rounded-lg shadow-lg border-2 border-teal-800/20">
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-teal-900">Create an Account</h2>
            <p className="text-slate-500">To save your preferences</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Full Name"
            className="border border-teal-300 rounded-md px-4 py-2 bg-stone-50 text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email Address"
            className="border border-teal-300 rounded-md px-4 py-2 bg-stone-50 text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create a Password"
            className="border border-teal-300 rounded-md px-4 py-2 bg-stone-50 text-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-md text-center">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="bg-teal-700 text-white rounded-md px-4 py-3 font-bold text-lg hover:bg-teal-800 transition-colors duration-300 shadow"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-600">Already have an account? </span>
          <Link to="/login" className="text-amber-600 hover:text-amber-700 font-bold underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
