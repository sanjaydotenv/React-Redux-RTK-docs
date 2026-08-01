import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../app/layout/AuthLayout";
import PublicProtected from "./protected/PublicProtected";
import LoginPage from "../features/auth/ui/pages/LoginPage";
import RegisterPage from "../features/auth/ui/pages/RegisterPage";
import MainLayout from "../app/layout/MainLayout";
import PrivateProtected from "./protected/PrivateProtected";
import HomePage from "../shared/ui/pages/HomePage";
import ProductPage from "../features/products/ui/pages/ProductPage";
import OrderPage from "../features/orders/ui/pages/OrderPage";
import CartPage from "../features/cart/ui/pages/CartPage";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <PublicProtected />,
          children: [
            {
              path: "",
              element: <LoginPage />,
            },
            {
              path: "/register",
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/main",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <PrivateProtected />,
          children: [
            {
              path: "",
              element: <HomePage />,
            },
            {
              path: "product",
              element: <ProductPage />,
            },
            {
              path: "order",
              element: <OrderPage />,
            },
            {
              path: "cart",
              element: <CartPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
