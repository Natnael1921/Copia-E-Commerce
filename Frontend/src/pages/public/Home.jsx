import React, { useEffect, useState, useRef } from "react";
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
  const { products, loading } = useProducts();
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const productsRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      setCategoryLoading(false);
    };
    fetchCategories();
  }, []);

  const displayProducts = products.length ? products : Array(8).fill({});

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-page">
      <Navbar />

      {/* Banner */}
      <Banner scrollToProducts={scrollToProducts} />

      {/* Categories Section */}
      <section className="categories" style={{ position: "relative" }}>
        {/* Scroll arrow  */}
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
                />
              );
            })
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="products" ref={productsRef}>
        <h2>Products</h2>
        <div className="products-list">
          {loading ? (
            <Loader />
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
