import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost/web-advanced-project/API/fetch_items.php")
      .then((response) => {
        if (response.data.success) {
          setItems(response.data.items);
        } else {
          setMessage("No items found");
        }
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setMessage("An error occurred while fetching items.");
      });
  }, []);

  const handleDelete = (itemId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!isConfirmed) {
      return;
    }

    axios
      .post(
        "http://localhost/web-advanced-project/API/delete_item.php",
        new URLSearchParams({ Id: itemId }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          setItems(items.filter((item) => item.Id !== itemId));
          setMessage("Item deleted successfully");
        } else {
          setMessage(response.data.message || "Error deleting item");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        setMessage("An error occurred while deleting the item.");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <h2>All Items</h2>
        <button className="link" onClick={() => navigate("/addItem")}>
          Back
        </button>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </div>

      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li
              key={item.Id}
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                width: "350px",
              }}
            >
              <span> - {item.Name}</span>
              <button
                onClick={() => handleDelete(item.Id)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No items available</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPage;
