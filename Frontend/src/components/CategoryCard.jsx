import React from "react";
import "../styles/categoryCard.css";

const CategoryCard = ({ category, products = [], onClick }) => {
  return (
    <div className="category-card" onClick={() => onClick(category)}>

      <div className="category-image-grid">
        {products.length > 0 ? (
          products.map((p, idx) => (
            <img key={idx} src={p.image} alt={p.name} />
          ))
        ) : (
          <>
            <img src="/placeholder-category.png" alt="placeholder" />
            <img src="/placeholder-category.png" alt="placeholder" />
            <img src="/placeholder-category.png" alt="placeholder" />
            <img src="/placeholder-category.png" alt="placeholder" />
          </>
        )}
      </div>

      <p>{category}</p>

    </div>
  );
};

export default CategoryCard;