import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import App from "../App";
import InfiniteScrolling from "../InfiniteScrolling";
import TanStack from "../TanStack";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <App />,
        },
        {
          path: "/pagination",
          element: <TanStack />,
        },
        {
          path: "/infinite",
          element: <InfiniteScrolling />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
