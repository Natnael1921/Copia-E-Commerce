import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../../services/cartService";
import "../../styles/cart.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCartItems(data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const changeQuantity = async (id, qty) => {
    await updateCartItem(id, qty);
    fetchCart();
  };

  const removeItem = async (id) => {
    await removeCartItem(id);
    fetchCart();
  };

  const handleClearCart = async () => {
    await clearCart();
    fetchCart();
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <h1>Your Cart</h1>

        {cartItems.length === 0 && (
          <p className="empty-cart">Your cart is empty</p>
        )}

        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.product.image || "/placeholder.png"}
                  alt={item.product.name}
                />

                <div className="cart-info">
                  <h3>{item.product.name}</h3>
                  <p>${item.product.price}</p>
                </div>

                <div className="cart-qty">
                  <button
                    onClick={() => changeQuantity(item._id, item.quantity - 1)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => changeQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="checkout-btn">Checkout</button>

            <button className="clear-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
