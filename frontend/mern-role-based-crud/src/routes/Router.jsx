import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AdminRoute from "./AdminRoute";
import AllUsers from "../components/AllUsers";
import ManagementRoute from "./ManagementRoute";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: (
          <AdminRoute>
            <Register />
          </AdminRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/users",
        element: (
          <ManagementRoute>
            <AllUsers />
          </ManagementRoute>
        ),
      },
    ],
  },
]);
