import React, { useContext, useState } from "react";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAuthButton = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/auth");
    }
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      {/* Left Side */}
      <div className="navbar-left">
        <div className="logo-container" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="Copia Logo" className="logo" />
          <span>Copia</span>
        </div>

        <div className="search-bar">
          <select className="category-select">
            <option value="">All</option>
          </select>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
            />
            <button className="search-btn">
              <img src="/searchIcon.png" alt="search" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="navbar-right">
        <div
          className="cart-icon"
          onClick={() => navigate("/cart")}
          title="Cart"
        >
          <img src="/cartIcon.png" alt="cart" />
        </div>

        {/* Desktop links */}
        <div className="desktop-links">
          {user && (
            <>
              <span className="welcome-text">
                Welcome, {user.name || user.email}!
              </span>
              <button className="nav-link" onClick={() => navigate("/orders")}>
                Orders
              </button>
            </>
          )}
          <button className="signin-btn" onClick={handleAuthButton}>
            {user ? "Logout" : "Sign in"}
          </button>
        </div>

        {/* Hamburger menu for mobile/tablet */}
        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {user && (
            <>
              <button
                onClick={() => {
                  navigate("/orders");
                  setMenuOpen(false);
                }}
              >
                Orders
              </button>
            </>
          )}
          <button onClick={handleAuthButton}>
            {user ? "Logout" : "Sign in"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
