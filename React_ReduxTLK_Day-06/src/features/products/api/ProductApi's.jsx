import { axiosInstance } from "../../../config/axiosInstance";
import { useAllProduct } from "../hooks/useProductHook";

export const getAllProducts = (seachProduct) => {
  try {
    let url = seachProduct ? `/products/search?q=${seachProduct}` : "/products";
    const response = axiosInstance.get(url);
    return response;
  } catch (error) {
    console.log(`Error is Product API, ${error}`);
  }
};

export const getProductCategories = async () => {
  try {
    const response = await axiosInstance.get("/products/categories");
    return response.data;
  } catch (error) {
    console.log(`Error is Product Category API, ${error}`);
  }
};


export const getProductByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.log(`Error is Get Product Category API, ${error}`);
  }
}