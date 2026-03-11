import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/adminCustomers.css";
import { getAllUsers } from "../../services/adminUserService";

export default function AdminCustomers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem("token");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(token);
        setUsers(data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="admin-container">
      <AdminSidebar open={sidebarOpen} />

      <div className="admin-main">
        <div className="admin-topbar">
          <button className="hamburger" onClick={toggleSidebar}>
            ☰
          </button>
          <h2>Customers</h2>
        </div>

        {loading ? (
          <p className="loading">Loading users...</p>
        ) : (
          <table className="customers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role || "user"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}