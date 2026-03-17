import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import ProductCard from "../../components/user/ProductCard";
import CategoryCard from "../../components/user/CategoryCard";
import Banner from "../../components/user/Banner";
import { useProducts } from "../../hooks/useProducts";
import { getCategories } from "../../services/productService";
import "../../styles/user/home.css";
import Loader from "../../components/shared/Loader";

const ScrollDownArrow = ({ onClick }) => (
  <div className="scroll-down-arrow" onClick={onClick}>
    ⬇
  </div>
);

const normalize = (str) => str?.toLowerCase().trim();

const getCategoryId = (cat) => "cat-" + normalize(cat).replace(/\s+/g, "-");

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const productsRef = useRef(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const { products, loading } = useProducts(searchQuery);

  //  Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      setCategoryLoading(false);
    };
    fetchCategories();
  }, []);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (!selectedCategory) return;

    const id = getCategoryId(selectedCategory);

    // wait for DOM render
    requestAnimationFrame(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }, [selectedCategory, products]);

  return (
    <div className="home-page">
      <Navbar />

      <Banner scrollToProducts={scrollToProducts} />

      {!searchQuery && (
        <section className="categories">
          <ScrollDownArrow onClick={scrollToProducts} />

          <h2>Categories</h2>

          <div className="categories-list">
            {categoryLoading ? (
              <Loader />
            ) : (
              categories.map((cat, idx) => {
                const categoryProducts = products
                  .filter((p) => normalize(p.category) === normalize(cat))
                  .slice(-4);

                return (
                  <CategoryCard
                    key={idx}
                    category={cat}
                    products={categoryProducts}
                    onClick={() => handleCategoryClick(cat)}
                  />
                );
              })
            )}
          </div>
        </section>
      )}

      {/* PRODUCTS */}
      <section className="products" ref={productsRef}>
        <h2>
          {searchQuery ? `Search results for "${searchQuery}"` : "Products"}
        </h2>

        {selectedCategory && (
          <p className="active-category">
            Showing: <span>{selectedCategory}</span>
          </p>
        )}

        {loading ? (
          <Loader />
        ) : searchQuery ? (
          <div className="products-list">
            {products.length === 0 ? (
              <p className="no-results">No products found</p>
            ) : (
              products.map((prod, idx) => (
                <ProductCard key={prod._id || idx} product={prod} />
              ))
            )}
          </div>
        ) : (
          categories.map((cat, idx) => {
            const categoryProducts = products.filter(
              (p) => normalize(p.category) === normalize(cat),
            );

            if (categoryProducts.length === 0) return null;

            return (
              <div
                key={idx}
                id={getCategoryId(cat)}
                className="category-section"
              >
                <h3 className="category-title">{cat}</h3>

                <div className="horizontal-scroll">
                  {categoryProducts.map((prod, i) => (
                    <ProductCard key={prod._id || i} product={prod} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default Home;
