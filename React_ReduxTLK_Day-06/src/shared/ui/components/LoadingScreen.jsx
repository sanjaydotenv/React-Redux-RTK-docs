import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-zinc-700"></div>

          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-violet-500 animate-spin"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-white text-xl font-semibold">
            Checking Authentication
          </h2>

          <p className="text-zinc-400 mt-2">Please wait...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
