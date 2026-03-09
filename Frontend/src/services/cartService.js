import API from "../api/api";

export const addToCart = async (productId) => {
  const res = await API.post("/cart", {
    productId,
    quantity: 1
  });

  return res.data;
}
export const getCart = async () => {
  const res = await API.get("/cart")
  return res.data
}

export const updateCartItem = async (id, quantity) => {
  const res = await API.put(`/cart/${id}`, { quantity })
  return res.data
}

export const removeCartItem = async (id) => {
  const res = await API.delete(`/cart/${id}`)
  return res.data
}

export const clearCart = async () => {
  const res = await API.delete("/cart/clear/all")
  return res.data
}