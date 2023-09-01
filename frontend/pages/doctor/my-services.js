import NoItemFound from "@/components/noItemFound";
import ShowReviews from "@/components/showReviews";
import DoctorLayout from "@/layout/doctor.layout";
import {
  ServiceDelete,
  getAllDoctorReview,
  getAllDoctorServiceList,
  getAllServiceList,
} from "@/service/doctor";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const myServices = () => {
  const [data, setdata] = useState([]);
  const getAllServices = async (page) => {
    const response = await getAllDoctorReview();
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
                <td className="px-6 py-4">
                  <ShowReviews service={service} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data?.length <= 0 && <NoItemFound message={"No Service Found"} />}
      </div>
    </DoctorLayout>
  );
};

export default myServices;
