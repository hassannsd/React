import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({
  notificationVisible,
  Notification,
  setNotificationVisible,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateInput = () => {
    const usernameRegex = /^[a-zA-Z0-9]{8,15}$/; // 8-15 characters, no special characters
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$/; // 8-15 characters, at least one uppercase letter and one number

    if (!usernameRegex.test(username)) {
      setError(
        "Username must be 8-15 characters long and contain only letters and numbers."
      );
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 8-15 characters long and include at least one uppercase letter and one number."
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) return;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch(
        "http://localhost/web-advanced-project/signup.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        setNotificationVisible(true);
        setMessage("Signup successful!");
        setUsername("");
        setPassword("");
        navigate("/");
      } else {
        setNotificationVisible(true);
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} method="POST">
        <div style={{ marginBottom: "10px" }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
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
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "orange",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Sign Up
        </button>
      </form>
      {message && (
        <p style={{ marginTop: "10px", color: "green" }}>{message}</p>
      )}
      {error && <p style={{ marginTop: "10px", color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signup;
