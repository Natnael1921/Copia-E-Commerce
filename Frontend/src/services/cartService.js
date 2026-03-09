import API from "../api/api";

export const addToCart = async (productId) => {
  const res = await API.post("/cart", {
    productId,
    quantity: 1
  });

  return res.data;
};