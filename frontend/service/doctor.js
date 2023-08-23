import request from "@/utils/request";
import FormData from "form-data";

export const getAllServiceList = async () => {
  const { data } = await request.get(`/doctor/get-all-service-list`);
  return data;
};

export const getAllDoctorServiceList = async () => {
  const { data } = await request.get(`/doctor/get-all-doctor-service-list
`);
  return data;
};
export const getDoctorAppointments = async (page, limit) => {
  const { data } = await request.get(
    `/doctor/get-all-doctor-appointments?page=${page}&limit=${limit}`
  );
  return data;
};
//  '/service/:service_id',
export const ServiceDelete = async (service_id) => {
  const { data } = await request.delete(`/doctor/service/${service_id}`);
  return data;
};
export const changeAppointmentStatus = async (appointment_id, status) => {
  const { data } = await request.post(`/doctor/change-appointment-status`, {
    appointment_id,
    status,
  });
  return data;
};

export const addService = async (service_name, service_price) => {
  const { data } = await request.post(`/doctor/add-service`, {
    service_name,
    service_price,
  });
  return data;
};
// '/profile/edit
export const doctorProfileEdit = async (
  specialization,
  qualification,
  experienceYears,
  clinicAddress,
  doctor_id
) => {
  const { data } = await request.post(`/doctor/profile/edit`, {
    specialization,
    qualification,
    experienceYears,
    clinicAddress,
    doctor_id,
  });
  return data;
};
// doctor/add-service
// /doctor/add-profile-photo
export const addProfilePicDoctor = async (image) => {
  const formData = new FormData();
  formData.append("photo", image);
  console.log(formData); // Log the formData to inspect its contents

  const { data } = await request.post(`/doctor/add-profile-photo`, formData);
  return data;
};
