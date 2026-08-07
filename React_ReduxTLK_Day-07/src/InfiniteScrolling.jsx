import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "./components/ProductApi";
import ProductsCard from "./components/ProductsCard";

const InfiniteScrolling = () => {
  let limit = 10;

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: ({ pageParam }) => getProducts(limit, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPage) => {
        //   console.log("All Pages", allPage);
        //   console.log("Last Pages", lastPage);

        let loadedData = allPage.length * limit;
        if (loadedData < lastPage.total) return loadedData;
        return undefined;
      },
    });

  if (isPending) return <h1>Loading...</h1>;

  let allProducts = data.pages.flatMap((val) => val.products);
  console.log(allProducts);
  console.log(data);

  useEffect(() => {
    const trackScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const nearBottom = scrollTop + windowHeight >= documentHeight - 200;

      if (nearBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", trackScroll);

    return () => {
      window.removeEventListener("scroll", trackScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="bg-black/90 h-min-screen p-10">
      <div className="grid grid-cols-4 gap-5">
        {allProducts.map((product) => {
          return <ProductsCard key={product.id} product={product} />;
        })}
      </div>
      <div className="flex items-center justify-center w-full py-10 cursor-pointer">
        {hasNextPage ? (
          <button className="text-white" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default InfiniteScrolling;
