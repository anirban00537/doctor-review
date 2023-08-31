import request from "@/utils/request";

export const loginApi = async (email, password) => {
  const { data } = await request.post("/auth/login", {
    email: email,
    password: password,
  });
  return data;
};

export const RegisterDoctorApi = async (
  email,
  password,
  name,
  education,
  publicationLink,
  currentPlace,
  country,
  otherImportantLink
) => {
  const { data } = await request.post("/auth/register-doctor", {
    email: email,
    password: password,
    name: name,
    education: education,
    publicationLink: publicationLink,
    currentPlace: currentPlace,
    country: country,
    otherImportantLink,
  });
  return data;
};
