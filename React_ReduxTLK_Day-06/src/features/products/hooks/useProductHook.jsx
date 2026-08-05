import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getProductByCategory,
  getProductCategories,
} from "../api/ProductApi's";
import { useEffect, useState } from "react";

export const useAllProduct = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [debounceSearch, setDebounceSearch] = useState(null);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setDebounceSearch(searchProduct);
    }, 1000);

    return () => {
      return clearTimeout(timeOut);
    };
  }, [searchProduct]);

  const { data, isPending, error } = useQuery({
    queryKey: ["Products", debounceSearch],
    queryFn: () => getAllProducts(debounceSearch),
  });

  return {
    data,
    isPending,
    error,
    searchProduct,
    setSearchProduct,
  };
};

export const useProductCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: getProductCategories,
  });
};

export const useProductByCategory = () => {
  const [productCategory, setProductCategory] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["getProdcutsByCategory", productCategory],
    queryFn: () => getProductByCategory(productCategory),
  });

  return {
    data,
    productCategory,
    setProductCategory,
  };
};
