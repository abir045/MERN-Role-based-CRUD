import React, { useContext } from "react";
import AuthContext from "../providers/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ManagementRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();

  const { data: userRole, isPending: roleLoading } = useQuery({
    queryKey: [user?.email, "userRole"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/role/${user?.email}`);
      console.log("User role:", res.data);
      return res.data?.role || "none";
    },
  });

  //   if (loading) {
  //     return <span className="loading loading-ring loading-xl"></span>;
  //   }

  const allowedRoles = ["Super Admin", "Admin", "Manager"];

  if (user && allowedRoles.includes(userRole)) {
    return children;
  }

  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default ManagementRoute;
