import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <logo className="logo-container">
          <img src="/logo.png" alt="Copia Logo" className="logo" />
          <span>Copia</span>
        </logo>

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
              <img src="/searchIcon.png" />
            </button>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        <button className="signin-btn">Sign in</button>
        <div className="cart-icon">
          <img src="/cartIcon.png" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
