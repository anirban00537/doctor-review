import request from "@/utils/request";

export const getAllServiceList = async () => {
  const { data } = await request.get(`/doctor/get-all-service-list`);
  return data;
};
export const getDoctorAppointments = async (page, limit) => {
  const { data } = await request.get(
    `/doctor/get-all-doctor-appointments?page=${page}&limit=${limit}`
  );
  return data;
};
// change-appointment-status
export const changeAppointmentStatus = async (appointment_id, status) => {
  const { data } = await request.post(`/doctor/change-appointment-status`, {
    appointment_id,
    status,
  });
  return data;
};