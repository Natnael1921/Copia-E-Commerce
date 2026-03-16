import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import StatCard from "../../components/admin/StatCard";
import Loader from "../../components/shared/Loader";
import { getAllProducts, getAllOrders } from "../../services/adminService";
import "../../styles/admin/adminDashboard.css";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    sales: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchDashboard = async () => {
    try {
      const products = await getAllProducts();
      const orders = await getAllOrders();

      const totalSales = orders.reduce(
        (sum, order) => sum + (order.totalPrice || 0),
        0,
      );

      const customers = new Set(orders.map((o) => o.user)).size;

      setStats({
        products: products.length,
        customers,
        sales: totalSales,
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="admin-container">
      <AdminSidebar open={sidebarOpen} toggle={toggleSidebar} />

      <div className="admin-main">
        <div className="admin-topbar">
          <button className="hamburger" onClick={toggleSidebar}>
            ☰
          </button>
          <h2>Dashboard</h2>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="stats-grid">
              <StatCard title="Total Products" value={stats.products} />
              <StatCard title="Total Customers" value={stats.customers} />
              <StatCard title="Total Sales" value={`$${stats.sales}`} />
            </div>

            <div className="recent-orders">
              <h3>Recent Orders</h3>

              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td>#{order._id.slice(-6)}</td>

                      <td>
                        <span className={`status-${order.status}`}>
                          {order.status}
                        </span>
                      </td>

                      <td>${order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
