import React, { useContext, useEffect, useState } from "react";
import "../../styles/user/navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    if (!debouncedQuery.trim()) {
      navigate("/");
      return;
    }

    navigate(`/?search=${debouncedQuery}`);
  }, [debouncedQuery, location.pathname, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/?search=${searchQuery}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <div className="logo-container" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="Copia Logo" className="logo" />
          <span>Copia</span>
        </div>

        {/* SEARCH */}
        <form className="search-bar" onSubmit={handleSearch}>
          <select className="category-select">
            <option value="">All</option>
          </select>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button type="submit" className="search-btn">
              <img src="/searchIcon.png" alt="search" />
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        {!user ? (
          <button
            type="button"
            className="signin-btn"
            onClick={() => navigate("/auth")}
          >
            Sign in
          </button>
        ) : (
          <>
            {/* MOBILE */}
            <div className="cart-icon" onClick={() => navigate("/cart")}>
              <img src="/cartIcon.png" alt="cart" />
            </div>
            <div className="desktop-links">
              <button
                type="button"
                className="orders-btn"
                onClick={() => navigate("/orders")}
              >
                Orders
              </button>

              <button type="button" onClick={handleLogout} className="log-out">
                Logout
              </button>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
              {menuOpen ? "✕" : "☰"}
            </div>
          </>
        )}
      </div>

      {/* MOBILE MENU */}
      {user && menuOpen && (
        <div className="mobile-menu">
          <button
            type="button"
            onClick={() => {
              navigate("/orders");
              setMenuOpen(false);
            }}
          >
            Orders
          </button>

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
