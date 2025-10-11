import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CalendarBody from "./components/CalendarBody";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* The background color for the entire app is set here */}
        <div className="min-h-screen bg-stone-100 flex flex-col">
          <Navbar />
          {/* Added padding here to give content space */}
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<CalendarBody />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

