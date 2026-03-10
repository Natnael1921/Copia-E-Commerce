import API from "../api/api"

export const getAllProducts = async () => {
  const res = await API.get("/products")
  return res.data
}

export const getAllOrders = async () => {
  const res = await API.get("/orders")
  return res.data
}