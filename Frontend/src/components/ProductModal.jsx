import { useState } from "react";
import "../styles/productModal.css";

export default function ProductModal({ close, submit, product }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || "",
    brand: product?.brand || "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If creating a new product, image is required
    if (!image && !product) {
      alert("Please select an image for the product");
      return;
    }

    const formData = new FormData();

    // Convert price to number
    Object.keys(form).forEach((key) => {
      formData.append(key, key === "price" ? Number(form[key]) : form[key]);
    });

    if (image) {
      formData.append("image", image);
    }

    await submit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="product-modal">
        <h3>{product ? "Edit Product" : "Add Product"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" className="cancel" onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
