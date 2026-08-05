import React from "react";
import { NavLink } from "react-router";
import { Box, ShoppingCart, LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 cursor-pointer">
      <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-3xl font-black tracking-wide">
          Shop<span className="text-gray-400">.</span>
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
          {[
            { name: "Home", path: "/main" },
            { name: "Shop", path: "/main/product" },
            { name: "About", path: "/main/about" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/main"}
              className={({ isActive }) =>
                `px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-black text-white shadow-md"
                    : "text-gray-600 hover:bg-white hover:text-black"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Icons */}
          <NavLink
            to="/main/cart"
            className={({ isActive }) =>
              `w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "bg-black text-white scale-110"
                  : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white hover:scale-105"
              }`
            }
          >
            <ShoppingCart size={20} />
          </NavLink>

          <NavLink
            to="/main/order"
            className={({ isActive }) =>
              `w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "bg-black text-white scale-110"
                  : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white hover:scale-105"
              }`
            }
          >
            <Box size={20} />
          </NavLink>

          {/* Logout */}
          <button className="flex items-center gap-2 px-5 h-11 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 active:scale-95 transition-all">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;