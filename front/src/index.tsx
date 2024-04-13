import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import LoginAndSignupForm from "./pages/LoginAndSignupForm/LoginAndSignupForm";
import PDFTemplates from "./pages/PDFTemplates/PDFTemplates";
import ProtectedRoutes from "./contexts/ProtectedRoutes";
import History from "./pages/History/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <LoginAndSignupForm type="login" />,
      },
      {
        path: "/signup",
        element: <LoginAndSignupForm type="signup" />,
      },
      {
        path: "/freepdfgenerator",
        element: <PDFTemplates free={true}/>,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/generatepdf",
            element: <PDFTemplates />,
          },
          {
            path: "/generatepdf/:id",
            element: <PDFTemplates />,
          },
          {
            path: "/history",
            element: <History />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
