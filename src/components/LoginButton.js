import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Set login state based on stored data
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear localStorage
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout} className="link orange logout">
          Logout
        </button>
      ) : (
        <button onClick={() => navigate("/login")} className="link orange">
          Login
        </button>
      )}
    </div>
  );
};

export default LoginButton;
