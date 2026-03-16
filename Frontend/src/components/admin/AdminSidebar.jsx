import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toastSuccess } from "../shared/Toast";
import "../../styles/admin/adminSidebar.css";

export default function AdminSidebar({ open, toggle }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");

    toastSuccess("Logged out successfully");

    navigate("/auth");
  };

  return (
    <aside className={`admin-sidebar ${open ? "open" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h2>Copia</h2>

        {/* Close button for mobile */}
        <button className="close-sidebar" onClick={toggle}>
          ✕
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-links">
        <NavLink to="/admin/dashboard" onClick={toggle}>
          <span className="sidebar-icon">
            <img src="/dashboard.png" alt="dashboard" />
          </span>
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" onClick={toggle}>
          <span className="sidebar-icon">
            <img src="/products.png" alt="products" />
          </span>
          Products
        </NavLink>

        <NavLink to="/admin/orders" onClick={toggle}>
          <span className="sidebar-icon">
            <img src="/orders.png" alt="orders" />
          </span>
          Orders
        </NavLink>

        <NavLink to="/admin/customers" onClick={toggle}>
          <span className="sidebar-icon">
            <img src="/customers.png" alt="customers" />
          </span>
          Customers
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="sidebar-logout" onClick={handleLogout}>
        <span className="sidebar-icon"></span>
        Logout
      </div>
    </aside>
  );
}
