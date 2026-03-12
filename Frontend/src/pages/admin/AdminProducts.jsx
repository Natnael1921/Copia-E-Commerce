import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import ProductModal from "../../components/ProductModal";
import ProductRow from "../../components/ProductRow";
import { useProducts } from "../../hooks/useProducts";
import Loader from "../../components/Loader";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/adminProductService";

import "../../styles/adminProducts.css";

export default function AdminProducts() {
  const { products, loading } = useProducts();

  const [productList, setProductList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sync fetched products to local state
  useEffect(() => {
    setProductList(products);
  }, [products]);

  // CREATE PRODUCT
  const handleCreate = async (formData) => {
    try {
      const newProduct = await createProduct(formData);

      setProductList((prev) => [newProduct, ...prev]);

      alert(" Product added successfully!");

      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert(" Failed to add product");
    }
  };

  // UPDATE PRODUCT
  const handleUpdate = async (formData) => {
    try {
      const updated = await updateProduct(editing._id, formData);

      setProductList((prev) =>
        prev.map((p) => (p._id === editing._id ? updated : p)),
      );

      alert(" Product updated successfully!");

      setEditing(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert(" Failed to update product");
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);

      setProductList((prev) => prev.filter((p) => p._id !== id));

      alert(" Product deleted successfully!");
    } catch (err) {
      console.error(err);
      alert(" Failed to delete product");
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

          <h2>Products</h2>

          <button
            className="add-product-btn"
            onClick={() => {
              setEditing(null);
              setShowModal(true);
            }}
          >
            + Add Product
          </button>
        </div>

        <div className="products-table">
          {loading ? (
            <Loader />
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
                {productList.map((p) => (
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
