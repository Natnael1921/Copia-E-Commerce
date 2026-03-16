import React, { useEffect, useState } from "react";
import Navbar from "../../components/user/Navbar";
import Loader from "../../components/shared/Loader";
import {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../../services/cartService";
import "../../styles/user/cart.css";
import { placeOrder } from "../../services/orderService";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../components/shared/Toast";
export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCartItems(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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

  const handleCheckout = async () => {
    try {
      await placeOrder();
      await clearCart();
      setShowCheckout(false);
      navigate("/orders");
    } catch (err) {
      console.error(err);
      toastError("Failed to place order");
    }
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

        {loading ? (
          <Loader />
        ) : (
          <>
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
                        onClick={() =>
                          changeQuantity(item._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          changeQuantity(item._id, item.quantity + 1)
                        }
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

                <button
                  className="checkout-btn"
                  onClick={() => setShowCheckout(true)}
                >
                  Checkout
                </button>

                <button className="clear-btn" onClick={handleClearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}

        {showCheckout && (
          <div className="checkout-modal">
            <div className="checkout-box">
              <h2>Confirm Order</h2>

              <p>Total Amount</p>
              <h3>${total.toFixed(2)}</h3>

              <div className="checkout-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowCheckout(false)}
                >
                  Cancel
                </button>

                <button className="confirm-btn" onClick={handleCheckout}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
