import api from "../api/api";

// Get all customers
export const getAllUsers = async (token) => {
  const res = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};