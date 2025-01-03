import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch items when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost/web-advanced-project/fetch_item.php")
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

  // Handle deleting an item
  const handleDelete = (itemId) => {
    axios
      .delete("http://localhost/web-advanced-project/delete_item.php", {
        data: { id: itemId },
      })
      .then((response) => {
        if (response.data.success) {
          setItems(items.filter((item) => item.id !== itemId)); // Remove the item from the state
          setMessage("Item deleted successfully");
        } else {
          setMessage("Error deleting item");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        setMessage("An error occurred while deleting the item.");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Items</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}

      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li
              key={item.id}
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                width: "350px",
              }}
            >
              <span>
                {item.Id} - {item.Name}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
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
