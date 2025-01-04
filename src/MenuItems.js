import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import MenuTabs from "./components/NavTabs";

const MenuItems = ({ addItemToCart, Notification, notificationVisible }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          "http://cheesysnacks.infinityfreeapp.com/menu.php"
        );
        setMenuItems(response.data);
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
