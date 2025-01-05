import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items when the component mounts
  useEffect(() => {
    getCartItems();
  }, []);

  // Function to fetch cart items from the server
  const getCartItems = async () => {
    try {
      const response = await axios.get(
        "http://cheesysnacks.infinityfreeapp.com/cart.php"
      );
      setCartItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false);
    }
  };

  // Function to add an item to the cart
  const addToCart = async (itemId, quantity) => {
    try {
      const response = await axios.post(
        "http://cheesysnacks.infinityfreeapp.com/cart.php",
        {
          item_id: itemId,
          quantity: quantity,
        }
      );
      alert(response.data.message);
      getCartItems(); // Refresh the cart after adding
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = async (cartId, quantity) => {
    try {
      const response = await axios.put(
        "http://cheesysnacks.infinityfreeapp.com/cart.php",
        {
          cart_id: cartId,
          quantity: quantity,
        }
      );
      alert(response.data.message);
      getCartItems(); // Refresh the cart after updating
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Function to remove an item from the cart
  const deleteItem = async (cartId) => {
    try {
      const response = await axios.delete(
        "http://cheesysnacks.infinityfreeapp.com/cart.php",
        {
          data: { cart_id: cartId },
        }
      );
      alert(response.data.message);
      getCartItems(); // Refresh the cart after deleting
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <li key={item.cart_id}>
                <div>
                  <h3>{item.Name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button
                    onClick={() =>
                      updateQuantity(item.cart_id, item.quantity + 1)
                    }
                  >
                    Increase Quantity
                  </button>
                  <button onClick={() => deleteItem(item.cart_id)}>
                    Remove from Cart
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Cart;
