import API from "../api/api";

// Get all orders (admin)
export const getAllOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// Update order status (admin)
export const updateOrderStatus = async (orderId, status) => {
  const token = localStorage.getItem("token");

  const res = await API.put(
    `/orders/${orderId}`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};