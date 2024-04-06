import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ErrorPage from "./components/ErrorPage";
import Sismo from "./pages/Sismo";
import Reporte from "./pages/Reporte";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        errorElement: <ErrorPage />,
      },
      {
        path: "sismos",
        element: <Sismo />,
      },
      {
        path: "reporte",
        element: <Reporte />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
