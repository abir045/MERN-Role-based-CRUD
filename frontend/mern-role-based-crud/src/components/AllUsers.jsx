import React, { useState } from "react";
import useUsers from "../hooks/useUsers";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AllUsers = () => {
  const [usersData, refetch] = useUsers();
  const [editingUser, setEditingUser] = useState(null);
  const [updatedRole, setUpdatedRole] = useState("");
  const axiosPublic = useAxiosPublic();

  const handleEditClick = (user) => {
    setEditingUser(user);
    setUpdatedRole(user.role);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setUpdatedRole("");
  };

  const handleRoleChange = (e) => {
    setUpdatedRole(e.target.value);
  };
  const handleUpdateRole = async (userId) => {
    try {
      const response = await axiosPublic.patch(`/api/users/${userId}`, {
        role: updatedRole,
      });

      if (response.status === 200) {
        // Refetch users data to update the table
        refetch();
        // Or invalidate the query
        // queryClient.invalidateQueries(["users"]);

        setEditingUser(null);
        setUpdatedRole("");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };
  const roleOptions = ["Super Admin", "Admin", "Manager", "Employee", "Staff"];

  console.log(usersData);

  return (
    <div>
      <h3 className="text-center font-bold text-3xl mt-10">All users</h3>

      <div className="overflow-x-auto mt-10 max-w-3xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  {editingUser && editingUser._id === item._id ? (
                    <select
                      value={updatedRole}
                      onChange={handleRoleChange}
                      className="select select-bordered select-sm"
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  ) : (
                    item.role
                  )}
                </td>
                <td>
                  {" "}
                  {editingUser && editingUser._id === item._id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateRole(item._id)}
                        className="btn btn-xs btn-success"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="btn btn-xs btn-ghost"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(item)}
                      className="btn btn-xs btn-outline"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
