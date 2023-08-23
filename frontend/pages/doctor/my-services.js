import NoItemFound from "@/components/noItemFound";
import DoctorLayout from "@/layout/doctor.layout";
import { ServiceDelete, getAllServiceList } from "@/service/doctor";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const myServices = () => {
  const [data, setdata] = useState([]);
  const getAllServices = async (page) => {
    const response = await getAllServiceList(page, 10);
    setdata(response?.data);
  };
  const handleDeleteService = async (serviceId) => {
    const response = await ServiceDelete(serviceId);
    if (response.success) {
      toast.success(response.message);
      getAllServices();
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <DoctorLayout>
      <div
        className="flex items-center justify-between py-2 px-14 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=879&q=80')", // Replace with your image path
          backgroundSize: "cover", // Adjust as needed
          backgroundPosition: "center", // Adjust as needed
          height: 150,
        }}
      >
        <div>
          <h3 className="font-semibold text-3xl text-white">Your Services</h3>
          <p className="text-sm text-white">Manage your services</p>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
        <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 mt-12">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search For Appointment"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Service Name
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Price{" "}
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map((service) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {service.name}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {moment(service?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td className="px-6 py-4">{service?.price}TK</td>
                <td className="px-6 py-4">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data?.appointments?.length <= 0 && (
          <NoItemFound message={"No appointment found"} />
        )}
      </div>
    </DoctorLayout>
  );
};

export default myServices;
