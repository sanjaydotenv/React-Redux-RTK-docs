import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import LoadingScreen from "../../shared/ui/components/LoadingScreen";

const PrivateProtected = () => {
  const { user, isLoading } = useSelector((store) => store.auth);

  if (isLoading) return <LoadingScreen />

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

export default PrivateProtected;
