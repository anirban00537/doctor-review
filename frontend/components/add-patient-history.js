import { addAppointment, addPatientHistory } from "@/service/user";
import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AddPatientHistory({ details, getMedicalHistoryData }) {
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };
  const [date, setDate] = useState("");
  const [problem, setProblem] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpDoctor, setFollowUpDoctor] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [isChronic, setIsChronic] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  const addPatientHistoryEntry = async () => {
    const response = await addPatientHistory(
      problem,
      diagnosis,
      treatment,
      date,
      hospitalName,
      doctorName,
      notes,
      followUpDate,
      followUpDoctor,
      isEmergency,
      isRecurring,
      isChronic,
      isCritical
    );
    if (response.success) {
      toast.success(response.message);
      setOpenModal(false);
      setOpenModal(false);
      setDate("");
      setProblem("");
      setDiagnosis("");
      setTreatment("");
      setHospitalName("");
      setDoctorName("");
      setNotes("");
      setFollowUpDate("");
      setFollowUpDoctor("");
      getMedicalHistoryData();
    } else {
      toast.error(response.message);
      setOpenModal(false);
    }
  };
  return (
    <>
      <button
        className="bg-white-500 text-sm hover:bg-white-600 text-gray-500 border font-semibold py-2 px-4 rounded mb-5"
        onClick={() => props.setOpenModal("default")}
      >
        Add Medical History
      </button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Medical History</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="relative w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Choose date
              </label>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Problem
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Diagnosis
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Treatment
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Hospital Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Doctor Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Notes
              </label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="relative w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Follow-up Date
              </label>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Follow-up Doctor
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={followUpDoctor}
                onChange={(e) => setFollowUpDoctor(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Is Emergency?
              </label>
              <input
                type="checkbox"
                className="form-checkbox text-blue-500 h-5 w-5"
                checked={isEmergency}
                onChange={(e) => setIsEmergency(e.target.checked)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Is Recurring?
              </label>
              <input
                type="checkbox"
                className="form-checkbox text-blue-500 h-5 w-5"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Is Chronic?
              </label>
              <input
                type="checkbox"
                className="form-checkbox text-blue-500 h-5 w-5"
                checked={isChronic}
                onChange={(e) => setIsChronic(e.target.checked)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Is Critical?
              </label>
              <input
                type="checkbox"
                className="form-checkbox text-blue-500 h-5 w-5"
                checked={isCritical}
                onChange={(e) => setIsCritical(e.target.checked)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={addPatientHistoryEntry}>
            Add History
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
