import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className="w-80 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 animate-pulse">

      {/* Image */}
      <div className="h-60 bg-zinc-800 flex items-center justify-center">
        <div className="w-40 h-40 rounded-xl bg-zinc-700"></div>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Category + Stock */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-20 rounded-full bg-zinc-700"></div>
          <div className="h-4 w-16 rounded bg-zinc-700"></div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 w-full rounded bg-zinc-700"></div>
          <div className="h-5 w-3/4 rounded bg-zinc-700"></div>
        </div>

        {/* Brand */}
        <div className="h-4 w-32 rounded bg-zinc-700 mt-4"></div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-4">
          <div className="h-5 w-5 rounded-full bg-zinc-700"></div>
          <div className="h-4 w-12 rounded bg-zinc-700"></div>
        </div>

        {/* Price + Button */}
        <div className="flex items-end justify-between mt-6">
          <div className="space-y-2">
            <div className="h-7 w-20 rounded bg-zinc-700"></div>
            <div className="h-4 w-16 rounded bg-zinc-700"></div>
          </div>

          <div className="h-10 w-24 rounded-xl bg-zinc-700"></div>
        </div>

      </div>
    </div>
  )
}

export default ProductCardSkeleton
