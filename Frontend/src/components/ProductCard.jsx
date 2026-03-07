import React from "react";
import "../styles/productCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image || "/placeholder.png"} alt={product.name || "Product"} />
      <h3>{product.name || "Product Name"}</h3>
      <p>{product.price ? `$${product.price}` : "$0.00"}</p>
    </div>
  );
};

export default ProductCard;