import React from "react";
import { Search } from "lucide-react";

const FilterProducts = ({ setSearchProducts, setCategory }) => {
  return (
    <div className="px-10 py-6">
      <div className="flex flex-col md:flex-row gap-5 max-w-5xl mx-auto">
        {/* Search */}
        <div className="relative flex-1 group">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-violet-400 transition-colors"
          />

          <input
            onInput={(e) => setSearchProducts(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="
              w-full
              h-14
              pl-14
              pr-5
              rounded-2xl
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              text-white
              placeholder:text-zinc-400
              outline-none
              transition-all
              duration-300
              shadow-[0_8px_30px_rgba(0,0,0,.35)]
              focus:border-violet-500
              focus:ring-4
              focus:ring-violet-500/20
            "
          />
        </div>

        {/* Category */}
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="
            w-full
            md:w-64
            h-14
            px-5
            rounded-2xl
            border border-white/10
            bg-zinc-900/90
            text-white
            outline-none
            transition-all
            duration-300
            shadow-[0_8px_30px_rgba(0,0,0,.35)]
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-500/20
            cursor-pointer
          "
        >
          <option value="all">All Categories</option>
          <option value="beauty">beauty</option>
          <option value="fragrances">fragrances</option>
          <option value="furniture">furniture</option>
          <option value="groceries">groceries</option>
        </select>
      </div>
    </div>
  );
};

export default FilterProducts;
