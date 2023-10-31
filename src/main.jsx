import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./componentes/Layout";
import Index from "./pages/Index";
import ErrorPage from "./componentes/ErrorPage";
import SismoTable from "./componentes/SismoTable";

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
        path: "sismos", // Define una nueva ruta para la tabla de sismos
        element: <SismoTable />, // Asigna el componente SismoTable a esta ruta
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
