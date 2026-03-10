import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import ProductModal from "../../components/ProductModal";
import ProductRow from "../../components/ProductRow";
import { useProducts } from "../../hooks/useProducts";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/adminProductService";

import "../../styles/adminProducts.css";

export default function AdminProducts() {
  const { products, loading } = useProducts();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreate = async (formData) => {
    await createProduct(formData);
    window.location.reload();
  };

  const handleUpdate = async (formData) => {
    await updateProduct(editing._id, formData);
    window.location.reload();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    window.location.reload();
  };

  return (
    <div className="admin-container">
      <AdminSidebar open={sidebarOpen} />

      <div className="admin-main">
        <div className="admin-topbar">
          <button className="hamburger" onClick={toggleSidebar}>
            ☰
          </button>

          <h2>Products</h2>

          <button
            className="add-product-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Product
          </button>
        </div>

        <div className="products-table">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <ProductRow
                    key={p._id}
                    product={p}
                    onEdit={(prod) => {
                      setEditing(prod);
                      setShowModal(true);
                    }}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <ProductModal
          close={() => {
            setShowModal(false);
            setEditing(null);
          }}
          submit={editing ? handleUpdate : handleCreate}
          product={editing}
        />
      )}
    </div>
  );
}
