import { addReview } from "@/service/user";
import { CANCELLED, COMPLETED, SCHEDULED } from "@/utils/core-constants";
import { Button, Modal } from "flowbite-react";
import moment from "moment";
import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import the star icons from react-icons
import { toast } from "react-toastify";
import ReviewList from "./reviewComponent";
import { useRouter } from "next/router";

const ShowReviews = ({ service }) => {
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };
  console.log(service, "service");

  return (
    <>
      <button
        className="bg-white text-sm hover:bg-green-100 text-gray-500 border border-gray-300 rounded-md font-semibold py-2 px-4 rounded"
        onClick={() => props.setOpenModal(true)}
      >
        Show reviews
      </button>

      <Modal show={props.openModal} onClose={() => props.setOpenModal(false)}>
        <Modal.Header className="text-white">
          Doctor Reviews for this service{" "}
        </Modal.Header>
        <Modal.Body className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {service?.review?.map((review) => (
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
                {(!service ||
                  !service.review ||
                  service.review.length === 0) && (
                  <p className="text-center col-span-2 lg:col-span-3">
                    No reviews available for this service.
                  </p>
                )}
              </div>
            </div>
          </section>
        </Modal.Body>

        <Modal.Footer className="bg-gray-100 dark:bg-gray-800">
          <Button color="gray" onClick={() => props.setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowReviews;
