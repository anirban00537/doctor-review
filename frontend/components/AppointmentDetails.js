import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import moment from "moment";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReviewList from "./reviewComponent";
import { useRouter } from "next/router";

const ShowPatientHistory = ({ details, userDetails }) => {
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };

  const router = useRouter();

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-md font-semibold"
        onClick={() => props.setOpenModal(true)}
      >
        View History
      </button>

      <Modal show={props.openModal} onClose={() => props.setOpenModal(false)}>
        <Modal.Header className="bg-white text-white">
          Patient History
        </Modal.Header>
        <Modal.Body className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            {/* User Details Section */}
            <div className="bg-gray-200 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-500">
                User Details
              </h2>
              <table className="table-auto w-full mt-4">
                <tbody>
                  <tr>
                    <td className="font-semibold">Name:</td>
                    <td>{userDetails.name}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Email:</td>
                    <td>{userDetails.email}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Age:</td>
                    <td>{userDetails.age}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Sex:</td>
                    <td>{userDetails.sex}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {details.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold text-blue-500">
                  History {index + 1}
                </h2>
                <table className="table-auto w-full mt-4">
                  <tbody>
                    {/* Patient History Details */}
                    <tr>
                      <td className="font-semibold">Date:</td>
                      <td>{moment(item.date).format("YYYY-MM-DD")}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Problem:</td>
                      <td>{item.problem}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Diagnosis:</td>
                      <td>{item.diagnosis}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Treatment:</td>
                      <td>{item.treatment}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Hospital Name:</td>
                      <td>{item.hospitalName}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Doctor Name:</td>
                      <td>{item.doctorName}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Notes:</td>
                      <td>{item.notes}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Follow-up Date:</td>
                      <td>{moment(item.followUpDate).format("YYYY-MM-DD")}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Follow-up Doctor:</td>
                      <td>{item.followUpDoctor}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Is Emergency:</td>
                      <td>{item.isEmergency ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Is Recurring:</td>
                      <td>{item.isRecurring ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Is Chronic:</td>
                      <td>{item.isChronic ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Is Critical:</td>
                      <td>{item.isCritical ? "Yes" : "No"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer className="bg-gray-100">
          <Button color="gray" onClick={() => props.setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowPatientHistory;
