import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Auth from "../pages/auth/Auth";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Orders from "../pages/user/Orders";
import Cart from "../pages/user/Cart";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminProducts from "../pages/admin/AdminProducts";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        {/* Protected User Pages */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;