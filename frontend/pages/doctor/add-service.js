import DoctorLayout from "@/layout/doctor.layout";
import { addService } from "@/service/doctor";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddService = () => {
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const handleServiceNameChange = (event) => {
    setServiceName(event.target.value);
  };

  const handleServicePriceChange = (event) => {
    setServicePrice(event.target.value);
  };
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addService(serviceName, servicePrice);
    if (response.success) {
      toast.success(response.message);
      router.push("/doctor/my-services");
    } else {
      toast.error(response.message);
    }
    setServiceName("");
    setServicePrice("");
  };
  return (
    <DoctorLayout>
      <div
        className="flex items-center justify-between py-2 px-14 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=879&q=80')", // Replace with your image path
          backgroundSize: "cover", // Adjust as needed
          backgroundPosition: "center", // Adjust as needed
          height: 250,
        }}
      >
        <div>
          <h3 className="font-semibold text-3xl text-white">Add Services</h3>
          <p className="text-sm text-white">Manage your services</p>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="service-name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Service Name
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                {/* Your icon */}
              </span>
              <input
                type="text"
                id="service-name"
                value={serviceName}
                onChange={handleServiceNameChange}
                className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Service Name"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="service-price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Service Price
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                {/* Your icon */}
              </span>
              <input
                type="number"
                id="service-price"
                value={servicePrice}
                onChange={handleServicePriceChange}
                className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Service Price"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Add Service
          </button>
        </form>
      </div>
    </DoctorLayout>
  );
};

export default AddService;
