import React, { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateUserAction } from "../features/auth/state/authAction";
import { createBrowserRouter, RouterProvider } from "react-router";
const AuthLayout = lazy(() => import("../app/layout/AuthLayout"))
const PublicProtected = lazy(() => import("./protected/PublicProtected"))
const LoginPage = lazy(() => import("../features/auth/ui/pages/LoginPage"))
const RegisterPage = lazy(() => import("../features/auth/ui/pages/RegisterPage"))
const MainLayout = lazy(() => import("../app/layout/MainLayout"))
const PrivateProtected = lazy(() => import("./protected/PrivateProtected"))
const HomePage = lazy(() => import("../shared/ui/pages/HomePage"))
const ProductPage = lazy(() => import("../features/products/ui/pages/ProductPage"))
const OrderPage = lazy(() => import("../features/orders/ui/pages/OrderPage"))
const CartPage = lazy(() => import("../features/cart/ui/pages/CartPage"));
const AboutPage = lazy(() => import("../shared/ui/pages/AboutPage"));

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      try {
        dispatch(hydrateUserAction());
      } catch (error) {
        console.log("error is Hydration", error);
      }
    })();
  }, []);

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
            {
              path: "about",
              element: <AboutPage />
            }
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
