import React from "react";
import {
  useAllProduct,
  useProductByCategory,
  useProductCategory,
} from "../../hooks/useProductHook";
import ProductCard from "../components/ProductCard";
import Skeleton from "../../../../shared/ui/components/Skeleton";
import Filter from "../../../../shared/ui/components/Filter";

const ProductPage = () => {
  const { data, isPending, error, searchProduct, setSearchProduct } =
    useAllProduct();

  const {
    data: products,
    setProductCategory,
    productCategory,
  } = useProductByCategory();

  return (
    <div className="p-10">
      <Filter
        setProductCategory={setProductCategory}
        productCategory={productCategory}
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
      />
      {isPending ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {products?.products.length
            ? products?.products?.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })
            : data?.data.products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
