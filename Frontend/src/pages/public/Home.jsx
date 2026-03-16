import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import CategoryCard from "../../components/CategoryCard";
import Banner from "../../components/Banner";
import { useProducts } from "../../hooks/useProducts";
import { getCategories } from "../../services/productService";
import "../../styles/home.css";
import Loader from "../../components/Loader";

// Scroll arrow component
const ScrollDownArrow = ({ onClick }) => (
  <div className="scroll-down-arrow" onClick={onClick}>
    ⬇
  </div>
);

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const productsRef = useRef(null);
  const location = useLocation();

  // Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  // Fetch products using search query
  const { products, loading } = useProducts(searchQuery);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      setCategoryLoading(false);
    };
    fetchCategories();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const displayProducts = filteredProducts.length
    ? filteredProducts
    : Array(8).fill({});

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    productsRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div className="home-page">
      <Navbar />

      {/* Banner */}
      <Banner scrollToProducts={scrollToProducts} />

      {/* Categories Section (Hidden when searching) */}
      {!searchQuery && (
        <section className="categories" style={{ position: "relative" }}>
          <ScrollDownArrow onClick={scrollToProducts} />

          <h2>Categories</h2>

          <div className="categories-list">
            {categoryLoading ? (
              <Loader />
            ) : (
              categories.map((cat, idx) => {
                const categoryProducts = products
                  .filter((p) => p.category === cat)
                  .slice(-4);

                return (
                  <CategoryCard
                    key={idx}
                    category={cat}
                    products={categoryProducts}
                    onClick={handleCategoryClick}
                  />
                );
              })
            )}
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="products" ref={productsRef}>
        <h2>
          {searchQuery ? `Search results for "${searchQuery}"` : "Products"}
        </h2>
        {selectedCategory && (
          <p className="active-category">Showing: <span>{selectedCategory}</span></p>
        )}
        <div className="products-list">
          {loading ? (
            <Loader />
          ) : products.length === 0 && searchQuery ? (
            <p className="no-results">No products found</p>
          ) : (
            displayProducts.map((prod, idx) => (
              <ProductCard key={prod._id || idx} product={prod} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
