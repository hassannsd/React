import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import MenuTabs from "./components/NavTabs";

const MenuItems = ({ addItemToCart, Notification, notificationVisible }) => {
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu items from the PHP backend using Axios
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost/web-advanced-project/menu.php"
        ); // Adjust the URL to your PHP endpoint
        setMenuItems(response.data); // Set menu items from the response
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div>
      <Header />
      <h3 id="menuTitle">Cheesy Menu</h3>
      <MenuTabs
        menuItems={menuItems}
        addItemToCart={addItemToCart}
        Notification={Notification}
        notificationVisible={notificationVisible}
      />
    </div>
  );
};

export default MenuItems;
