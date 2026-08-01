import React from "react";
import { NavLink } from "react-router";
import { useAuthHook } from "../hook/AuthHook";

const Navbar = () => {
  const { logoutUser } = useAuthHook();

  return (
    <nav className="w-full bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-lg">
            M
          </div>
          <h1 className="text-xl font-bold text-white">
            My<span className="text-violet-500">Store</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <NavLink
              to={"/"}
              className="text-zinc-300 hover:text-violet-500 transition"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/main/shop"}
              className="text-zinc-300 hover:text-violet-500 transition"
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/main/about"}
              className="text-zinc-300 hover:text-violet-500 transition"
            >
              About
            </NavLink>
          </li>
        </ul>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold">
              M
            </div>
            <span className="text-zinc-200 font-medium">Mayur</span>
          </div>

          <button onClick={logoutUser} className="px-5 py-2 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
