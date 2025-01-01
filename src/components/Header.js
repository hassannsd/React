import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <Link
      to="/"
      className="logo"
      style={{
        backgroundColor: "black",
        borderRadius: "18px",
        padding: "10px  ",
        textDecoration: "none",
      }}
    >
      Cheesy Snacks
    </Link>
    <nav>
      <div className="menu">
        <Link to="/menu" className="link">
          Our Menu
        </Link>
        <Link to="/Home" className="link">
          Special Offers
        </Link>
        <Link to="/about" className="link">
          About
        </Link>
        <Link to="/cart" className="link">
          Cart
        </Link>
        <Link to="/login" className="link orange">
          LogIn
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;
