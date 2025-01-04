import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Ensure the username and password are entered
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    // Create an object with the username and password
    const requestData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(
        "https://cheesysnacks.infinityfreeapp.com/index.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the correct content type
          },
          body: JSON.stringify(requestData), // Send the data as JSON
        }
      );

      const data = await response.json();

      console.log("Login Response:", data); // Debug the response

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user)); // Save user to localStorage
        setIsLoggedIn(true); // Set the login state to true
        setError(""); // Reset the error message
        navigate(data.user.isAdmin == 1 ? "/addItem" : "/"); // Redirect to the dashboard
      } else {
        setError(data.message); // Show error message if login fails
      }
    } catch (err) {
      console.error("Login Error:", err); // Log any errors
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <button className="log" type="submit">
          Login
        </button>
        <button className="log" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
        <button className="log" onClick={() => navigate("/")}>
          Continue Without Login
        </button>
      </form>

      {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}
    </div>
  );
};

export default AdminLogin;
