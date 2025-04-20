import React from "react";
import useUsers from "../hooks/useUsers";

const AllUsers = () => {
  const [usersData] = useUsers();

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
                <td>{item.role}</td>
                <td>Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
