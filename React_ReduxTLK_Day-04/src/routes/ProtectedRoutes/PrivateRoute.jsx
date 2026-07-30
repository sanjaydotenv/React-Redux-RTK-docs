import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const {
    auth: { user },
  } = useSelector((state) => state);

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
