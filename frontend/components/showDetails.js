import { addReview } from "@/service/user";
import { CANCELLED, COMPLETED, SCHEDULED } from "@/utils/core-constants";
import { Button, Modal } from "flowbite-react";
import moment from "moment";
import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import the star icons from react-icons
import { toast } from "react-toastify";
import ReviewList from "./reviewComponent";
import { useRouter } from "next/router";

const AppointmentDetails = ({ details }) => {
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const addReviewFunction = async () => {
    const response = await addReview(rating, comment, details.doctorsServiceId);
    if (response.success) {
      toast.success(response?.message);
      router.push("/service-details/" + details?.doctorsServiceId);
    } else {
      toast.error(response?.message);
    }
  };
  console.log(details, "details");
  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <>
      <button
        className="bg-white text-sm hover:bg-green-100 text-gray-500 border border-gray-300 rounded-md font-semibold py-2 px-4 rounded"
        onClick={() => props.setOpenModal(true)}
      >
        Details
      </button>

      <Modal show={props.openModal} onClose={() => props.setOpenModal(false)}>
        <Modal.Header className="text-white">Appointment Form</Modal.Header>
        <Modal.Body className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="grid gap-4">
            {/* Existing fields */}
            <div className="grid grid-cols-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Choose date:
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {moment(details.date).format("MMMM Do YYYY, h:mm:ss a")}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Reason:
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {details.reason}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Doctor Name:
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {details.doctor.name}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Doctor Email:
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {details.doctor.email}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Status:
              </span>
              <div className="flex items-center">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    details?.status === SCHEDULED
                      ? "bg-green-500"
                      : details?.status === CANCELLED
                      ? "bg-red-500"
                      : "bg-green-500"
                  } mr-2`}
                />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {details.status}
                </span>
              </div>
            </div>
            {details?.status === COMPLETED && (
              <>
                <div className="grid grid-cols-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Review:
                  </span>
                  <textarea
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    rows="4"
                    placeholder="Write your review..."
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Rating:
                  </span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingChange(star)}
                      >
                        {star <= rating ? (
                          <FaStar className="text-yellow-500" size={22} />
                        ) : (
                          <FaStarHalfAlt className="text-gray-300" size={22} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer className="bg-gray-100 dark:bg-gray-800">
          {details?.status === COMPLETED && (
            <Button color="success" onClick={addReviewFunction}>
              Add Review
            </Button>
          )}

          <Button color="gray" onClick={() => props.setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppointmentDetails;
