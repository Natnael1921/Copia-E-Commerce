import { useState, useEffect } from "react";
import { getAllProducts, getCategories } from "../services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const prods = await getAllProducts();
      const cats = await getCategories();
      setProducts(prods);
      setCategories(cats);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { products, categories, loading };
};