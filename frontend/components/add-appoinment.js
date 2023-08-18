import { addAppointment } from "@/service/user";
import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AddAppointments({ details }) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [date, setDate] = useState();
  const [reason, setReason] = useState();
  const { isLoggedIn } = useSelector((state) => state.userInfo);

  const addUserAppointment = async () => {
    const response = await addAppointment(
      details?.doctorId,
      date,
      reason,
      details?.id
    );
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <button
          className="bg-green-500 text-sm hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          onClick={() => props.setOpenModal("default")}
        >
          Add Appointment
        </button>
      ) : (
        <Link href={"/login"}>
          <button
            className="bg-green-500 text-sm hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Add Appointment
          </button>
        </Link>
      )}

      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Appointment Form</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="relative w-full">
              <label
                for="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Choose date
              </label>

              <input
                datepicker
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <label
                for="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Reason
              </label>
              <textarea
                id="base-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="success"
            onClick={() => {
              addUserAppointment();
            }}
          >
            Confirm
          </Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
