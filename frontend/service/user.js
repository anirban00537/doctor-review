import request from "@/utils/request";

export const getUserAppointments = async (page, limit) => {
  const { data } = await request.get(
    `/user/get-user-apoinments?page=${page}&limit=${limit}`
  );
  return data;
};
// /add-patient-history
export const addPatientHistory = async (
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
) => {
  const { data } = await request.post(`/user/add-patient-history`, {
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
    isCritical,
  });
  return data;
};
export const addReview = async (rating, comment, doctorsServiceId) => {
  const { data } = await request.post(`/user/add-review`, {
    rating: rating,
    comment: comment,
    doctorsServiceId: doctorsServiceId,
  });
  return data;
};
// user/service-details/6
export const getServiceDetails = async (serviceId) => {
  const { data } = await request.get(`/user/service-details/${serviceId}`);
  return data;
};
export const getProfile = async () => {
  const { data } = await request.get("/user/profile");
  return data;
};
export const getMedicalHistoryUser = async () => {
  const { data } = await request.get("/user/get-user-medical-history");
  return data;
};
export const addAppointment = async (
  doctorId,
  date,
  reason,
  doctorsServiceId
) => {
  const { data } = await request.post("/user/add-apoinment", {
    doctorId: doctorId,
    date: date,
    reason: reason,
    doctorsServiceId: doctorsServiceId,
  });
  return data;
};
