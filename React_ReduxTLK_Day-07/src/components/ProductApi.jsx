import axios from "axios";

export const getProducts = async (limit , pageParam) => {
  console.log(pageParam)
  const res = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${pageParam}`,
  );

  return res.data
};
