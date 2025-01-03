import { useState, useEffect } from "react";
const MenuTabs = ({
  menuItems,
  addItemToCart,
  Notification,
  notificationVisible,
}) => {
  const [activeTab, setActiveTab] = useState("all-menu");
  const [filteredItems, setFilteredItems] = useState(menuItems);

  // Update filtered items whenever menuItems prop changes
  useEffect(() => {
    setFilteredItems(menuItems);
  }, [menuItems]);

  const handleActive = (tabId) => {
    setActiveTab(tabId);

    if (tabId === "all-menu") {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter((item) => item.type === tabId));
    }
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            id="all-menu"
            className={`nav-link ${activeTab === "all-menu" ? "active" : ""}`}
            onClick={() => handleActive("all-menu")}
            style={{
              color: "black",
              backgroundColor: activeTab === "all-menu" ? "orange" : "",
            }}
          >
            All Menu
          </a>
        </li>
        <li className="nav-item">
          <a
            id="burger"
            className={`nav-link ${activeTab === "burger" ? "active" : ""}`}
            onClick={() => handleActive("burger")}
            style={{
              color: "black",
              backgroundColor: activeTab === "burger" ? "orange" : "",
            }}
          >
            Burgers
          </a>
        </li>
        <li className="nav-item">
          <a
            id="wrap"
            className={`nav-link ${activeTab === "wrap" ? "active" : ""}`}
            onClick={() => handleActive("wrap")}
            style={{
              color: "black",
              backgroundColor: activeTab === "wrap" ? "orange" : "",
            }}
          >
            Wraps
          </a>
        </li>
      </ul>
      <Notification
        show={notificationVisible}
        message={"Item added to Cart!"}
      />
      <div className="row row-cols-auto">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              className="card col-sm-3 mb-3 mb-sm-0 text-center"
              style={{
                margin: "50px",
                display: "flex",
                flexWrap: "wrap",
                backgroundColor: "#FFaf",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">{item.Name}</h5>
                <p className="card-text">{item.price}.00$</p>
                <button
                  className="btn btn-warning"
                  onClick={() => addItemToCart(item)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuTabs;
