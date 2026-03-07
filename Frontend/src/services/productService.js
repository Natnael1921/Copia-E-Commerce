import API from "../api/api";

export const getAllProducts = async () => {
  try {
    const res = await API.get("/products");
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const res = await API.get("/products"); 
    const categories = [...new Set(res.data.map((p) => p.category))];
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};