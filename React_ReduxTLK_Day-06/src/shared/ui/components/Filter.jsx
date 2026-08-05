import { Search, SlidersHorizontal } from "lucide-react";
import React from "react";
import { getProductCategories } from "../../../features/products/api/ProductApi's";
import { useProductCategory } from "../../../features/products/hooks/useProductHook";

const Filter = ({
  setSearchProduct,
  searchProduct,
  setProductCategory,
  productCategory,
}) => {
  const { data, isPending } = useProductCategory();

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
      {/* Search */}
      <div className="relative w-full md:w-[620px]">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={searchProduct}
          onInput={(e) => {
            return setSearchProduct(e.target.value);
          }}
          type="text"
          placeholder="Search products..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white outline-none
      focus:ring-2 focus:ring-black/10 focus:border-black transition"
        />
      </div>

      {/* Right Side */}
      <div className="flex gap-3">
        {/* Category */}
        <select

        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-200 bg-white
  outline-none focus:ring-2 focus:ring-black/10"
        >
          <option value="">All Categories</option>

          {!isPending &&
            data.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
        </select>

        <button
          className="flex items-center gap-2 px-5 py-3 rounded-xl
      bg-black text-white hover:opacity-90 transition"
        >
          <SlidersHorizontal size={18} />
          Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
