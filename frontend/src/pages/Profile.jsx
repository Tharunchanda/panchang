import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const {user , setUser} = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-2">
        <span className="font-semibold">Name:</span> {user.name}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Email:</span> {user.email}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Role:</span> {user.role}
      </div>
      {/* Add more user details here if needed */}
    </div>
  );
}

export default Profile;