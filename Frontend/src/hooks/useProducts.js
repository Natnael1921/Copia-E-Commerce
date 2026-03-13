import { useState, useEffect } from "react";
import { getAllProducts, getCategories } from "../services/productService";

export const useProducts = (searchQuery = "") => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const prods = await getAllProducts(searchQuery);
      const cats = await getCategories();
      setProducts(prods);
      setCategories(cats);
      setLoading(false);
    };
    fetchData();
  }, [searchQuery]);

  return { products, categories, loading };
};