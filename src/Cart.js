import React from "react";
import Header from "./components/Header";

const Cart = ({
  cart,
  removeItemFromCart,
  incrementQuantity,
  decrementQuantity,
}) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="mb-4">Your Cart</h2>

        {cart.length > 0 ? (
          <div>
            <ul className="list-group mb-4">
              {cart.map((item) => (
                <li
                  key={item.id} // Ensuring unique key
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    {item.Name} - ${Number(item.price).toFixed(2)} x{" "}
                    {item.quantity}
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
              ))}
            </ul>
            <div className="d-flex justify-content-between">
              <strong>Total: ${calculateTotal().toFixed(2)}</strong>
              <button className="btn btn-success">Checkout</button>
            </div>
          </div>
        ) : (
          <p className="text-muted">Your cart is empty. Start adding items!</p>
        )}
      </div>
    </>
  );
};

export default Cart;
