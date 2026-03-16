import React from "react";
import "../../styles/user/productcard.css";
import { addToCart } from "../../services/cartService";

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      await addToCart(product._id);
      alert("Added to cart");
    } catch (error) {
      console.error(error);
      alert("Please login first");
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name || "Product"}
        />
      </div>

      <h3>{product.name || "Product Name"}</h3>
      <p>{product.price ? `$${product.price}` : "$0.00"}</p>

      <img
        src="/cartIcon.png"
        className="cart-overlay"
        onClick={handleAddToCart}
      />
    </div>
  );
};

export default ProductCard;
