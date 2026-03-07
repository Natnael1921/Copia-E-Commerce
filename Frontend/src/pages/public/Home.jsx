import React from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import CategoryCard from "../../components/CategoryCard";
import { useProducts } from "../../hooks/useProducts";
import "../../styles/home.css";

const Home = () => {
  const { products, loading } = useProducts();

  // placeholders appear even if API fails
  const displayProducts = products.length ? products : Array(8).fill({});
  const displayCategories = Array(6).fill({});

  return (
    <div className="home-page">
      <Navbar />

      <header className="home-header">
        <div className="home-header-text">
          <h1>Discover the Future Shopping</h1>
          <p>Shop the latest trends and best deals for electronics, fashion and more</p>
          <button className="shop-btn">Shop Now</button>
        </div>
        <div className="home-header-image">
          <img src="/banner.png" alt="Banner" />
        </div>
      </header>

      {/* Categories Section */}
      <section className="categories">
        <h2>Categories</h2>
        <div className="categories-list">
          {displayCategories.map((cat, idx) => (
            <CategoryCard key={idx} category={cat} />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="products">
        <h2>Products</h2>
        <div className="products-list">
          {loading ? (
            <p>Loading...</p>
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