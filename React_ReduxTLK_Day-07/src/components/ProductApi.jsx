import axios from "axios";

export const getProducts = async (limit , page) => {
  const res = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`,
  );

  return res.data
};
