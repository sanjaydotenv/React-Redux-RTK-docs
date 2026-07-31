import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";

export const useProductData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productsData, setproductsData] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");
  const [category, setCategory] = useState("");
  console.log(category);

  const getData = async () => {
    const data = await getProducts();
    setproductsData(data);
    setIsLoading(false);
  };

  const filterData = () => {
    const filteredData = productsData.filter((val) => {
      return val.title.toLowerCase().includes(searchProducts.toLowerCase());
    });

    console.log(searchProducts);
    setproductsData(filteredData);
  };

  const searchByCategory = () => {
    const categories = productsData.filter((val) => {
      console.log(val);
      return val.category === category;
    });
    console.log(categories);
    setproductsData(categories);
  };

  useEffect(() => {
    searchByCategory();
  }, [category]);

  useEffect(() => {
    filterData();
  }, [searchProducts]);

  useEffect(() => {
    getData();
  }, []);

  return {
    isLoading,
    setSearchProducts,
    productsData,
    setCategory,
  };
};
