import request from "@/utils/request";
import FormData from "form-data";

export const getAllServiceList = async () => {
  const { data } = await request.get(`/doctor/get-all-service-list`);
  return data;
};

export const serviceSearch = async (query) => {
  const { data } = await request.post(`/doctor/service/search`, {
    query,
  });
  return data;
};

export const getAllDoctorServiceList = async () => {
  const { data } = await request.get(`/doctor/get-all-doctor-service-list
`);
  return data;
};
export const getAllDoctorReview = async () => {
  const { data } = await request.get(`/doctor/get-all-doctor-reviews
`);
  return data;
};
export const getDoctorAppointments = async (page, limit, search) => {
  if (search) {
    const { data } = await request.get(
      `/doctor/get-all-doctor-appointments?page=${page}&limit=${limit}&search=${search}`
    );
    return data;
  } else {
    const { data } = await request.get(
      `/doctor/get-all-doctor-appointments?page=${page}&limit=${limit}`
    );
    return data;
  }
};
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
  education,
  publication_link,
  current_place,
  country,
  other_inportent_link,
  description,
  doctor_id
) => {
  const { data } = await request.post(`/doctor/profile/edit`, {
    specialization,
    qualification,
    experienceYears,
    clinicAddress,
    doctor_id,
    education,
    publication_link,
    current_place,
    country,
    other_inportent_link,
    description,
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
