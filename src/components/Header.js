import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const user = JSON.parse(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header>
      <Link
        to="/"
        className="logo"
        style={{
          backgroundColor: "black",
          borderRadius: "18px",
          padding: "10px",
          textDecoration: "none",
          color: "orange",
        }}
      >
        Cheesy Snacks
      </Link>

      <nav>
        <div className="menu">
          <Link to={"/profile"}>
            <FontAwesomeIcon
              icon={faUser}
              style={{ fontSize: "24px", color: "orange", marginRight: "10px" }}
            />
          </Link>
          <Link to="/menu" className="link">
            Our Menu
          </Link>
          <Link to="/home" className="link">
            Special Offers
          </Link>
          <Link to="/about" className="link">
            About
          </Link>
          <Link to="/cart" className="link">
            Cart
          </Link>
          <LoginButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
