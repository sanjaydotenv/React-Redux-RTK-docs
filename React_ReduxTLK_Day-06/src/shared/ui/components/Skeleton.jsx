import React from "react";

const Skeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="w-72 rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden animate-pulse"
        >
          <div className="h-60 bg-gray-200"></div>

          <div className="p-5">
            <div className="h-5 w-20 bg-gray-200 rounded-full mb-4"></div>

            <div className="h-5 w-52 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-36 bg-gray-200 rounded"></div>

            <div className="flex items-center gap-2 mt-4">
              <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>

            <div className="flex justify-between items-center mt-5">
              <div className="h-7 w-20 bg-gray-200 rounded"></div>
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
            </div>

            <div className="h-11 w-full bg-gray-200 rounded-xl mt-6"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
