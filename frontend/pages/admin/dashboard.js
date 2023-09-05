import NoItemFound from "@/components/noItemFound";
import AdminLayout from "@/layout/admin.layout";
import { getAllUsers, deleteUser } from "@/service/user";
import moment from "moment";
import React, { useEffect } from "react";

const Dashboard = () => {
  const [users, setUsers] = React.useState([]);
  const getAllUsersFn = async () => {
    const response = await getAllUsers();
    setUsers(response.data);
  };
  const deleteUserFn = async (id) => {
    const response = await deleteUser(id);
    if (response.success) {
      getAllUsersFn();
    }
  };

  useEffect(() => {
    getAllUsersFn();
  }, []);
  return (
    <AdminLayout>
      <div
        className="flex items-center justify-between py-2 px-14 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1415356838286-df6fd593e8b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')", // Replace with your image path
          backgroundSize: "cover", // Adjust as needed
          backgroundPosition: "center", // Adjust as needed
          height: 250,
        }}
      >
        <div>
          <h3 className="font-semibold text-3xl text-white">
            Welcome to admin dashboard
          </h3>
          <p className="text-sm text-white">Manage your users and more.</p>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Joined Date
              </th>
              <th scope="col" className="px-6 py-3">
                Patient Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {user?.name ? user?.name : "No name"}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {moment(user?.date).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <div className="font-normal text-gray-500">
                  {user?.email ? user?.email : user?.email}
                </div>
                <td className="px-6 py-4">
                  {user.role === "USER"
                    ? "User"
                    : user.role === "ADMIN"
                    ? "Admin"
                    : "Doctor"}
                </td>
                <td>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => {
                      deleteUserFn(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length <= 0 && <NoItemFound message={"No user found"} />}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
