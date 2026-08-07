import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="w-72 rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="h-60 bg-gray-100 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">
        {/* Category */}
        <span className="inline-block text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full mb-3 capitalize">
          {product.category}
        </span>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 text-yellow-500">
          ⭐<span className="text-sm text-gray-600">{product.rating} / 5</span>
        </div>

        {/* Price & Stock */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-bold text-indigo-600">${product.price}</p>

          <span
            className={`text-sm font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Button */}
        <button className="w-full mt-5 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
