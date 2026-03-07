import React from "react";
import "../styles/categoryCard.css";

const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <img src={category.image || "/placeholder-category.png"} alt={category.name || "Category"} />
      <p>{category.name || "Category"}</p>
    </div>
  );
};

export default CategoryCard;