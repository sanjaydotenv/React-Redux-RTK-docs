import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return <div className="bg-[#19191b] min-h-screen text-white">
    <Navbar />
    <Outlet />
  </div>;
};

export default MainLayout;
