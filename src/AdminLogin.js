import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/web-advanced-project/login.php",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure Content-Type is correct
          },
        }
      );

      if (response.data.success) {
        setMessage("Admin login successful!");

        // Convert isAdmin to a number to avoid string/number comparison issues
        const isAdmin = Number(response.data.isAdmin);

        if (isAdmin === 1) {
          navigate("/addItem"); // Navigate to Add Item page for admin
        } else {
          navigate("/"); // Navigate to home page for non-admin
        }
      } else {
        setMessage(response.data.message); // Show error message if login fails
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
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
          Create Account
        </button>
      </form>

      {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}
    </div>
  );
};

export default AdminLogin;
