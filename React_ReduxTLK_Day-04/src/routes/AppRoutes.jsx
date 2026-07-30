import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";
import MainLayout from "../layout/MainLayout";
import HomePage from "../page/HomePage";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/AuthSlice";
import PublicRoute from "./ProtectedRoutes/PublicRoute";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";

const AppRoutes = () => {
  const dispatch = useDispatch();

  const hydrateUser = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      toast.error("UnAuthorized User");
      return;
    }

    dispatch(loginUser(loggedInUser));
  };

  useEffect(() => {
    hydrateUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <LoginPage />,
            },
            {
              path: "register",
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/main",
      element: <PrivateRoute />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <HomePage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
