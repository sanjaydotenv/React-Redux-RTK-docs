import React, { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import FilterProducts from "../components/FilterProducts";
import { useProductData } from "../hook/ProductHook";

const ShopPage = () => {
  const { isLoading , setSearchProducts , productsData , setCategory} = useProductData();

  return (
    <div>
      <FilterProducts setSearchProducts={setSearchProducts} setCategory={setCategory} />
      <div className="flex flex-wrap gap-10 justify-center">
        {isLoading ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          productsData.map((product) => {
            return (
              <div
                key={product.id}
                className="w-80 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-violet-500 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10"
              >
                {/* Product Image */}
                <div className="bg-zinc-800 p-6 flex justify-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-52 object-contain hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category + Stock */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-violet-600/20 text-violet-400 capitalize">
                      {product.category}
                    </span>

                    <span
                      className={`text-xs font-medium ${
                        product.stock > 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {product.stock > 0 ? "● In Stock" : "● Out of Stock"}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-white font-semibold text-lg line-clamp-2">
                    {product.title}
                  </h2>

                  {/* Brand */}
                  <p className="text-zinc-400 text-sm mt-1">
                    Brand :
                    <span className="text-zinc-200 ml-1">{product.brand}</span>
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-zinc-300">{product.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between mt-5">
                    <div>
                      <h1 className="text-2xl font-bold text-white">
                        ${product.price}
                      </h1>

                      <p className="text-green-400 text-sm">
                        {product.discountPercentage}% OFF
                      </p>
                    </div>

                    <button className="bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-xl text-white font-medium transition">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ShopPage;
