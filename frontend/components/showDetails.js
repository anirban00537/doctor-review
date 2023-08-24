import { CANCELLED, SCHEDULED } from "@/utils/core-constants";
import { Button, Modal } from "flowbite-react";
import moment from "moment";
import React, { useState } from "react";

const AppointmentDetails = ({ details }) => {
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };

  const addUserAppointment = () => {
    // Implement this function to add the user's appointment
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
        <Modal.Header className=" text-white">Appointment Form</Modal.Header>
        <Modal.Body className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="grid gap-4">
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
            <div className="grid grid-cols-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Review:
              </span>
              <textarea
                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                rows="4"
                placeholder="Write your review..."
              />
            </div>
            <div className="grid grid-cols-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Reviews:
              </span>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Great experience! Would recommend.
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Appointment was cancelled without notice.
                  </span>
                </div>
                {/* Add more review items here */}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-gray-100 dark:bg-gray-800">
          <Button color="success">Confirm</Button>
          <Button color="gray" onClick={() => props.setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppointmentDetails;
