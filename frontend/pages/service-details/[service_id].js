import AddAppointments from "@/components/add-appoinment";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getServiceDetails } from "@/service/user";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import the star icons from react-icons

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
                details?.doctor?.photo_url
                  ? `http://localhost:3000/uploads/${
                      details?.doctor?.photo_url?.split("/")[1]
                    }`
                  : "https://img.freepik.com/premium-vector/doctor-avatar-character-with-stethoscope-sunglasses_960323-79.jpg?w=2000"
              }
            />
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {details?.review?.map((review) => (
              <div
                key={review?.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <p className="text-lg leading-relaxed mb-4">
                  {review?.comment}
                </p>
                <div className="flex items-center mb-4">
                  <div>
                    <span className="text-gray-900 font-semibold">
                      {review?.user?.email}
                    </span>
                    <p className="text-gray-500 text-sm">
                      {review?.created_at}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1 flex">
                    {Array.from({ length: Math.floor(review?.rating) }).map(
                      (_, index) => (
                        <svg
                          key={index}
                          fill="currentColor"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2c-1.761 0-3.501.488-5.018 1.414-1.823 1.176-3.009 3.034-3.182 5.125-.181 2.179 1.101 4.272 3.319 6.395l4.568 4.569c.194.194.448.293.701.293s.507-.099.701-.293l4.568-4.568c2.218-2.122 3.5-4.216 3.318-6.395-.172-2.091-1.359-3.949-3.182-5.125C15.501 2.488 13.761 2 12 2zm0 18l-4.568-4.569c-1.257-1.257-1.963-2.464-2.121-3.591-.219-1.384.23-2.594 1.207-3.574C8.36 7.774 10.197 7 12 7c1.803 0 3.64.775 4.481 1.865.977.98 1.426 2.19 1.207 3.574-.158 1.127-.864 2.334-2.121 3.591L12 20zm-.938-9.364a.625.625 0 01-.43-.155l-1.4-1.2a.623.623 0 11.86-.898l1.4 1.2a.625.625 0 01-.43 1.053zm3.876 0a.625.625 0 01-.429-1.056l1.4-1.2a.623.623 0 01.86.898l-1.4 1.2a.62.62 0 01-.431.158zm-3.948 3.166a.627.627 0 01-.428-1.056l3.101-2.654a.623.623 0 11.859.898l-3.1 2.654a.623.623 0 01-.43.158zm3.879 0a.623.623 0 01-.43-.158l-3.1-2.654a.623.623 0 11.859-.898l3.101 2.654a.627.627 0 01-.43 1.056zm-3.943 3.157a.622.622 0 01-.43-.158l-1.402-1.2a.623.623 0 11.859-.897l1.402 1.2a.625.625 0 01-.429 1.056zm3.874 0a.623.623 0 01-.43-1.056l1.402-1.2a.623.623 0 11.859.898l-1.402 1.2a.625.625 0 01-.429.158z" />
                        </svg>
                      )
                    )}
                  </span>
                  <span className="text-gray-500">
                    {review?.rating} ({Math.floor(review?.rating)}/5)
                  </span>
                </div>
              </div>
            ))}
            {/* If there are no reviews */}
            {(!details || !details.review || details.review.length === 0) && (
              <p className="text-center col-span-2 lg:col-span-3">
                No reviews available for this service.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetails;
