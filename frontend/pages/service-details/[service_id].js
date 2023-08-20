import AddAppointments from "@/components/add-appoinment";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getServiceDetails } from "@/service/user";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ServiceDetails = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const { service_id } = router.query;
  const getDetails = async (service_id) => {
    const response = await getServiceDetails(Number(service_id));
    console.log(response, "This is a response");
    setDetails(response.data);
  };
  useEffect(() => {
    getDetails(service_id);
  }, [service_id]);

  return (
    <div>
      <Navbar />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {details?.doctor?.name}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {details?.name}
              </h1>
              <div className="flex mb-4">
                <a className="flex-grow text-green-500 border-b-2 border-green-500 py-2 text-lg px-1">
                  Description
                </a>
              </div>

              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Doctor Email</span>
                <span className="ml-auto text-gray-900">
                  {details?.doctor?.email}
                </span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Clinic Address</span>
                <span className="ml-auto text-gray-900">
                  {details?.doctor?.doctorProfile?.clinicAddress}
                </span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Doctor Qualification</span>
                <span className="ml-auto text-gray-900">
                  {details?.doctor?.doctorProfile?.qualification}
                </span>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {details?.price}TK
                </span>
                <div className="ml-auto">
                  <AddAppointments details={details} />
                </div>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={
                `http://localhost:3000/uploads/${
                  details?.doctor?.photo_url?.split("/")[1]
                }` ?? "https://via.placeholder.com/80"
              }
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
