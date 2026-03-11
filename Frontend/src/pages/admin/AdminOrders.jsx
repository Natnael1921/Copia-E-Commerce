import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/adminOrders.css";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/adminOrderService";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Change order status
  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o._id === id ? updated : o)));
      alert(`Order status updated to "${status}"`);
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar open={sidebarOpen} />

      <div className="admin-main">
        <div className="admin-topbar">
          <button className="hamburger" onClick={toggleSidebar}>
            ☰
          </button>
          <h2>Orders</h2>
        </div>

        {loading ? (
          <p className="loading">Loading orders...</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Products</th>
                <th>Total</th>
                <th>Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.user?.name || "Unknown User"}</td>
                    <td>
                      {order.items?.length
                        ? order.items.map((item) => (
                            <div key={item.product?._id}>
                              {item.product?.name} x {item.quantity}
                            </div>
                          ))
                        : "No items"}
                    </td>
                    <td>${order.totalPrice?.toFixed(2)}</td>
                    <td>{order.status}</td>
                    <td>
                      {/* Desktop: show buttons */}
                      <div className="status-buttons desktop-only">
                        {["Pending", "Shipped", "Delivered"].map((s) => (
                          <button
                            key={s}
                            className={`status-btn ${
                              s === order.status ? "active" : ""
                            }`}
                            onClick={() => handleStatusChange(order._id, s)}
                            disabled={s === order.status}
                          >
                            {s}
                          </button>
                        ))}
                      </div>

                      {/* Mobile/Tablet: show dropdown */}
                      <div className="mobile-only">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                        >
                          {["Pending", "Shipped", "Delivered"].map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
