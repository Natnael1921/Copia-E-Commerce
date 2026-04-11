const CategorySkeleton = () => {
  return (
    <div className="category-card">
      <div className="category-image-grid">
        {[1, 2].map((_, i) => (
          <div key={i} className="skeleton skeleton-box"></div>
        ))}
      </div>

      <div className="skeleton skeleton-text category-text"></div>
    </div>
  );
};

export default CategorySkeleton;