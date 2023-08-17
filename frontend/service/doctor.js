import request from "@/utils/request";

export const getAllServiceList = async () => {
  const { data } = await request.get(`/doctor/get-all-service-list`);
  return data;
};
