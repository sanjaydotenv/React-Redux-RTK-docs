import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getProducts } from "./components/ProductApi";
import ProductCard from "./components/ProductsCard";

const TanStack = () => {
  let limit = 10;
  const [page, setPage] = useState(1);

  const { data, isPending, error, isPlaceholderData } = useQuery({
    queryKey: ["products", page],
    queryFn: () => {
      return getProducts(limit, page);
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  });

  if (isPending) return "Loading..";
  if (error) return "Error..";


  let pages = Math.ceil(data.total / limit);

  return (
    <div>
      <div
        style={{ opacity: isPlaceholderData ? 0.3 : 1 }}
        className="grid grid-cols-4 gap-5"
      >
        {data?.products?.map((product) => {
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
          Page {page} of {pages}
        </p>
        <button
          disabled={page >= pages - 1}
          onClick={() => setPage(page + 1)}
          className="bg-yellow-500 px-12 py-3 rounded-xl text-xl text-black/70 font-semibold active:scale-95"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TanStack;
