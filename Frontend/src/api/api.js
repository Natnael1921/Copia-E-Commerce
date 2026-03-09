import axios from "axios";

const API = axios.create({
  baseURL: "https://copia-e-commerce.onrender.com/api",
});

export default API;