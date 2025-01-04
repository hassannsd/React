import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import LoginButton from "./components/LoginButton";

const AddItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setError("Please enter a valid price greater than zero.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/web-advanced-project/add_item.php",
        new URLSearchParams(formData)
      );
      if (response.data.success) {
        setMessage(response.data.message);
        setFormData({ name: "", type: "", price: "" });
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add New Item</h1>

      <LoginButton />

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Item Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="type">Item Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="">Select Type</option>
            <option value="burger">Burger</option>
            <option value="wrap">Wrap</option>
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "orange",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Add Item
          </button>
          <button
            onClick={() => navigate("/items")}
            style={{
              padding: "10px 20px",
              backgroundColor: "orange",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            All Items
          </button>
        </div>
      </form>

      {message && (
        <p style={{ color: "green", marginTop: "20px" }}>{message}</p>
      )}
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
    </div>
  );
};

export default AddItem;
