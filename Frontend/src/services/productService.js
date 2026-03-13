import API from "../api/api";

export const getAllProducts = async (searchQuery = "") => {
  const url = searchQuery ? `/products?search=${searchQuery}` : `/products`;

  const res = await API.get(url);

  return res.data;
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
