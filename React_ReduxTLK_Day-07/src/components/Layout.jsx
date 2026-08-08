import React from "react";
import { NavLink, Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <div className="flex gap-10 justify-center items-center h-20 font-semibold">
        <NavLink to={"/"}>Without TanStack Query</NavLink>
        <NavLink to={"/pagination"}>Pagination With TanStack Query </NavLink>
        <NavLink to={"/infinite"}>Infinite Scrolling</NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
