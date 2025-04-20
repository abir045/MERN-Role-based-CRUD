import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: usersData = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  return [usersData];
};

export default useUsers;
