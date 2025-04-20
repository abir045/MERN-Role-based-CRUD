import React from "react";
import { useContext } from "react";
import AuthContext from "../providers/AuthContext";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const [isAdmin, isAdminLoading] = useAdmin();

  console.log(isAdmin);

  const location = useLocation();

  if (isAdminLoading) {
    return <span className="loading loading-ring loading-xl"></span>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
