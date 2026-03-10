import { NavLink } from "react-router-dom";
import "../styles/adminSidebar.css";

export default function AdminSidebar({ open, toggle }) {
  return (
    <aside className={`admin-sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>Copia</h2>
      </div>

      <nav className="sidebar-links">
        <NavLink to="/admin/dashboard">
          <span className="sidebar-icon">
            <img src="/dashboard.png" />
          </span>{" "}
          Dashboard
        </NavLink>

        <NavLink to="/admin/products">
          <span className="sidebar-icon">
            <img src="/products.png" />
          </span>{" "}
          Products
        </NavLink>

        <NavLink to="/admin/orders">
          <span className="sidebar-icon">
            <img src="/orders.png" />
          </span>{" "}
          Orders
        </NavLink>

        <NavLink to="/admin/customers">
          <span className="sidebar-icon">
            <img src="/customers.png" />
          </span>{" "}
          Customers
        </NavLink>
      </nav>
    </aside>
  );
}
