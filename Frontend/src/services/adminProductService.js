import API from "../api/api";

export const createProduct = async (formData) => {

  const token = localStorage.getItem("token");

  const res = await API.post(
    "/products",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};


export const updateProduct = async (id, formData) => {

  const token = localStorage.getItem("token");

  const res = await API.put(
    `/products/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};


export const deleteProduct = async (id) => {

  const token = localStorage.getItem("token");

  const res = await API.delete(
    `/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};