import API from "../api/api";

export const placeOrder = async () => {
  const res = await API.post("/orders");
  return res.data;
};

export const getMyOrders = async () => {
  const res = await API.get("/orders/my");
  return res.data;
};