import NoItemFound from "@/components/noItemFound";
import Pagination from "@/components/pagination";
import AppointmentDetails from "@/components/showDetails";
import Layout from "@/layout";
import { getUserAppointments } from "@/service/user";
import { CANCELLED, SCHEDULED } from "@/utils/core-constants";
import { SSRAuthCheck } from "@/utils/ssr";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [data, setdata] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.userInfo);
  const getAppointments = async (page) => {
    const response = await getUserAppointments(page, 10);
    console.log(response, "response");
    setdata(response?.data);
  };
  useEffect(() => {
    isLoggedIn && getAppointments(1);
  }, [isLoggedIn]);
  return (
    <Layout>
      <div
        className="flex items-center justify-between py-2 px-14 relative"
        style={{
          backgroundImage:
            "url('/multicolor-shapes-black-backround_1297-161.jpg')", // Replace with your image path
          backgroundSize: "cover", // Adjust as needed
          backgroundPosition: "center", // Adjust as needed
          height: 150,
        }}
      >
        <div>
          <h3 className="font-semibold text-3xl text-white">
            Welcome to patient dashboard
          </h3>
          <p className="text-sm text-white">
            Manage your appointments and more.
          </p>
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
              placeholder="Search for users"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Doctor Name
              </th>
              <th scope="col" className="px-6 py-3">
                Appointment Date
              </th>
              <th scope="col" className="px-6 py-3">
                Specialist At
              </th>
              <th scope="col" className="px-6 py-3">
                Appointment Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.appointments?.map((appointment) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {appointment?.doctor?.name}
                    </div>
                    <div className="font-normal text-gray-500">
                      {appointment?.doctor?.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {moment(appointment?.date).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td className="px-6 py-4">
                  {appointment?.doctor?.doctorProfile?.specialization
                    ? appointment?.doctor?.doctorProfile?.specialization
                    : "Not defined"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {appointment.status === SCHEDULED ? (
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />
                    ) : appointment.status === CANCELLED ? (
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />
                    ) : (
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />
                    )}{" "}
                    {appointment?.status}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {/* <button>Details</button> */}
                  <AppointmentDetails details={appointment} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data?.appointments?.length <= 0 && (
          <NoItemFound message={"No appointment found"} />
        )}
      </div>
      <Pagination data={data} handlePaginationChange={getAppointments} />
    </Layout>
  );
};
export const getServerSideProps = async (ctx) => {
  await SSRAuthCheck(ctx);

  return {
    props: {},
  };
};
export default Dashboard;
