import React, { useEffect, useState } from "react";
import "../../styles/user/banner.css";

const banners = [
  {
    title: "Discover the Future Shopping",
    text: "Shop the latest trends and best deals for electronics and more",
    image: "/banner.png",
  },
  {
    title: "New Electronics Collection",
    text: "Explore smartphones, laptops and accessories",
    image: "/banner2.png",
  },
  {
    title: "Upgrade Your Lifestyle",
    text: "Smart gadgets for smarter living",
    image: "/banner3.png",
  },
  {
    title: "Big Discounts Today",
    text: "Save more on top products",
    image: "/banner4.png",
  },
];

const Banner = ({ scrollToProducts }) => {
  const [index, setIndex] = useState(0);

  // Auto slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="banner">
      <button className="banner-btn left" onClick={prevSlide}>
        &#10094;
      </button>

      <div className="banner-content">
        <div className="banner-text">
          <h1>{banners[index].title}</h1>
          <p>{banners[index].text}</p>
          <button className="shop-btn" onClick={scrollToProducts}>
            Shop Now
          </button>
        </div>

        <div className="banner-image">
          <img src={banners[index].image} alt="banner" />
        </div>
      </div>

      <button className="banner-btn right" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Banner;