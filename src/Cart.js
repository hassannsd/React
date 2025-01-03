import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Fetch the cart data from the database
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "http://localhost/web-advanced-project/cart.php"
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
      await axios.put("http://localhost/web-advanced-project/cart.php", {
        cart_id: cartId,
        quantity: currentQuantity + 1, // Increment quantity
      });

      // Fetch updated cart data
      const response = await axios.get(
        "http://localhost/web-advanced-project/cart.php"
      );
      setCart(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  const decrementQuantity = async (cartId, currentQuantity) => {
    if (currentQuantity > 1) {
      try {
        await axios.put("http://localhost/web-advanced-project/cart.php", {
          cart_id: cartId,
          quantity: currentQuantity - 1, // Decrement quantity
        });

        // Fetch updated cart data
        const response = await axios.get(
          "http://localhost/web-advanced-project/cart.php"
        );
        setCart(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error decrementing quantity:", error);
      }
    }
  };

  const removeItemFromCart = async (cartId) => {
    try {
      await axios.delete("http://localhost/web-advanced-project/cart.php", {
        data: { cart_id: cartId },
      });

      // Fetch updated cart data
      const response = await axios.get(
        "http://localhost/web-advanced-project/cart.php"
      );
      setCart(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error removing item from cart:", error);
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
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                {item.Name} - ${Number(item.price).toFixed(2)} x {item.quantity}
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm mx-1"
                  disabled={item.quantity === 1}
                  onClick={() => decrementQuantity(item.id)}
                >
                  -
                </button>
                <button
                  className="btn btn-primary btn-sm mx-1"
                  onClick={() => incrementQuantity(item.id)}
                >
                  +
                </button>
                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => removeItemFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-muted">Your cart is empty. Start adding items!</p>
        )}
      </div>
    </>
  );
};

export default Cart;
