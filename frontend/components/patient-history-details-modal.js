import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function PatientHistoryDetailsModal({ history }) {
  const [openModal, setOpenModal] = useState(false);

  const props = { openModal, setOpenModal };

  return (
    <>
      <button
        className="bg-white-500 text-sm hover:bg-white-600 text-gray-500 border font-semibold py-2 px-4 rounded mb-5"
        onClick={() => props.setOpenModal("default")}
      >
        Details
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Patient History Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <p>
              <strong>Date:</strong> {history?.date}
            </p>
            <p>
              <strong>Problem:</strong> {history?.problem}
            </p>
            <p>
              <strong>Diagnosis:</strong> {history?.diagnosis || "N/A"}
            </p>
            <p>
              <strong>Treatment:</strong> {history?.treatment || "N/A"}
            </p>
            <p>
              <strong>Hospital Name:</strong> {history?.hospitalName || "N/A"}
            </p>
            <p>
              <strong>Doctor Name:</strong> {history?.doctorName || "N/A"}
            </p>
            <p>
              <strong>Notes:</strong> {history?.notes || "N/A"}
            </p>
            <p>
              <strong>Prescription:</strong> {history?.prescription || "N/A"}
            </p>
            <p>
              <strong>Follow-up Date:</strong> {history?.followUpDate || "N/A"}
            </p>
            <p>
              <strong>Follow-up Doctor:</strong>{" "}
              {history?.followUpDoctor || "N/A"}
            </p>
            <p>
              <strong>Is Emergency:</strong>{" "}
              {history?.isEmergency ? "Yes" : "No"}
            </p>
            <p>
              <strong>Is Recurring:</strong>{" "}
              {history?.isRecurring ? "Yes" : "No"}
            </p>
            <p>
              <strong>Is Chronic:</strong> {history?.isChronic ? "Yes" : "No"}
            </p>
            <p>
              <strong>Is Critical:</strong> {history?.isCritical ? "Yes" : "No"}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
