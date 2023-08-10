import request from "@/utils/request";

export const getUserAppointments = async () => {
  const { data } = await request.get("/user/get-user-apoinments");
  return data;
};

export const getProfile = async () => {
  const { data } = await request.get("/user/profile");
  return data;
};
