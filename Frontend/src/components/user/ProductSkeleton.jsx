// components/skeletons/ProductSkeleton.jsx
import "../../styles/user/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="product-card">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text small"></div>
    </div>
  );
};

export default ProductSkeleton;
