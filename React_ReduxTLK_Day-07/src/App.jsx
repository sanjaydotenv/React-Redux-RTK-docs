import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ProductCard from "./components/ProductsCard";
import { getProducts } from "./components/ProductApi";

const App = () => {
  let limit = 10;
  const [productData, setProductData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  const getData = async () => {
    const products = await getProducts(limit, page);
    setProductData(products);
    setTotalPages(products.total);
  };

  useEffect(() => {
    getData();
  }, [page]);

  console.log(productData);

  let Pages = Math.ceil(totalPages / limit);

  return (
    <div className="p-10">
      <div className="grid grid-cols-4 gap-5">
        {productData.products?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>

      <div className="flex gap-5 items-center justify-center w-full mt-10">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="bg-yellow-500 px-12 py-3 rounded-xl text-xl text-black/70 font-semibold active:scale-95"
        >
          Prev
        </button>
        <p>
          Page {page} of {Pages}
        </p>
        <button
          disabled={page >= Pages - 1}
          onClick={() => setPage(page + 1)}
          className="bg-yellow-500 px-12 py-3 rounded-xl text-xl text-black/70 font-semibold active:scale-95"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
