import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        }
      );

      if (response.data.success && response.data.user) {
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        setMessage("Login successful!");

        if (Number(user.isAdmin == 1)) {
          navigate("/addItem");
        } else {
          navigate("/");
        }
      } else {
        setMessage(response.data.message || "Login failed");
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
