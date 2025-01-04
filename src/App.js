import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  HashRouter,
} from "react-router-dom"; // Updated imports for v6
import MenuItems from "./MenuItems";
import Cart from "./Cart";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import About from "./About";
import AdminLogin from "./AdminLogin";
import AddItem from "./AddItem";
import Signup from "./components/Signup";
import axios from "axios";
import Profile from "./components/Profile";
import AdminPage from "./AdminItems";

const Notification = ({ show, message }) => {
  return show && <div className="notification">{message}</div>;
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const addItemToCart = async (item) => {
    try {
      // Send the item to the backend to add it to the cart database
      await axios.post("https://cheesysnacks.infinityfreeapp.com/cart.php", {
        item_id: item.Id,
        quantity: 1, // Default quantity to add
      });

      // Show notification for 3 seconds
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeItemFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const incrementQuantity = (itemId) => {
    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (itemId) => {
    setCart(
      cart.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/menu"
            element={
              <MenuItems
                addItemToCart={addItemToCart}
                Notification={Notification}
                notificationVisible={notificationVisible}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeItemFromCart={removeItemFromCart}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                Notification={Notification}
                notificationVisible={notificationVisible}
                setNotificationVisible={setNotificationVisible}
              />
            }
          />
          <Route path="/addItem" element={<AddItem />} />
          <Route path="/items" element={<AdminPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<h1> Error 404 </h1>} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
