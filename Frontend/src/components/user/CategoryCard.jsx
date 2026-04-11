import React from "react";
import "../../styles/user/categorycard.css";

const CategoryCard = ({ category, products = [], onClick }) => {
  return (
    <div className="category-card" onClick={() => onClick(category)}>
      <div className="category-image-grid">
        {products.length > 0 ? (
          products
            .slice(0, 2)
            .map((p, idx) => <img key={idx} src={p.image} alt={p.name} />)
        ) : (
          <>
            <img src="/placeholder-category.png"  />
            <img src="/placeholder-category.png"  />
          </>
        )}
      </div>

      <p>{category}</p>
    </div>
  );
};

export default CategoryCard;