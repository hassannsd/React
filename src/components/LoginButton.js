import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user); // Set true if user exists in localStorage
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
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
        <Link to="/login" className="link orange">
          LogIn
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
