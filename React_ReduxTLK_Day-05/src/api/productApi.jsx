import { axiosInstance } from "../config/axiosInstance";

export const getProducts = async () => {
  console.log("API CALL")
  const {
    data: { products },
  } = await axiosInstance.get("/products");
  return products;
};
