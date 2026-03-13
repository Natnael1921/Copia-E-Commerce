import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import CategoryCard from "../../components/CategoryCard";
import { useProducts } from "../../hooks/useProducts";
import { getCategories } from "../../services/productService";
import "../../styles/home.css";
import Loader from "../../components/Loader";

const Home = () => {
  const { products, loading } = useProducts();

  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      setCategoryLoading(false);
    };

    fetchCategories();
  }, []);

  const displayProducts = products.length ? products : Array(8).fill({});

  return (
    <div className="home-page">
      <Navbar />

      <header className="home-header">
        <div className="home-header-text">
          <h1>Discover the Future Shopping</h1>
          <p>
            Shop the latest trends and best deals for electronics, fashion and
            more
          </p>
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
      <section className="products">
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