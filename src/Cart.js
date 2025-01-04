import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "http://cheesysnacks.infinityfreeapp.com/cart.php"
        ); // Adjust the URL to your PHP endpoint
        setCart(response.data); // Set cart items from the response
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const incrementQuantity = async (cartId, currentQuantity) => {
    try {
      await axios.put("http://cheesysnacks.infinityfreeapp.com/cart.php", {
        cart_id: cartId,
        quantity: currentQuantity + 1,
      });

      const response = await axios.get(
        "http://cheesysnacks.infinityfreeapp.com/cart.php"
      );
      setCart(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  const decrementQuantity = async (cartId, currentQuantity) => {
    if (currentQuantity > 1) {
      try {
        await axios.put("http://cheesysnacks.infinityfreeapp.com/cart.php", {
          cart_id: cartId,
          quantity: currentQuantity - 1,
        });

        const response = await axios.get(
          "http://cheesysnacks.infinityfreeapp.com/cart.php"
        );
        setCart(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error decrementing quantity:", error);
      }
    }
  };

  const removeItemFromCart = async (cartId) => {
    try {
      const response = await axios.delete(
        "http://cheesysnacks.infinityfreeapp.com/cart.php",
        {
          data: { cart_id: cartId },
        }
      );

      if (response.data.success) {
        setCart(cart.filter((item) => item.cart_id !== cartId));
        setMessage("Item deleted successfully");
      } else {
        setMessage(response.data.message || "Error deleting item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setMessage("An error occurred while deleting the item.");
    }
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="mb-4">Your Cart</h2>

        {cart && cart.length > 0 ? (
          cart.map((item) => (
            <li
              key={item.cart_id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                paddingBottom: "5px",
                marginTop: "10px",
                borderBottom: "1px solid gray",
              }}
            >
              <div>
                {item.Name} - ${Number(item.price).toFixed(2)} x {item.quantity}
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm mx-1"
                  disabled={item.quantity === 1}
                  onClick={() => decrementQuantity(item.cart_id, item.quantity)}
                >
                  -
                </button>
                <button
                  className="btn btn-primary btn-sm mx-1"
                  onClick={() => incrementQuantity(item.cart_id, item.quantity)}
                >
                  +
                </button>
                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => removeItemFromCart(item.cart_id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-muted">Your cart is empty. Start adding items!</p>
        )}
        <div
          className="mt-4"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <strong>Total: ${calculateTotal().toFixed(2)}</strong>
          <button className="btn btn-success">Checkout</button>
        </div>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </>
  );
};

export default Cart;
