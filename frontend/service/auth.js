import request from "@/utils/request";

export const loginApi = async (email, password) => {
  const { data } = await request.post("/auth/login", {
    email: email,
    password: password,
  });
  return data;
};
export const RegisterApi = async (email, password, name, age, sex) => {
  const { data } = await request.post("/auth/register", {
    email: email,
    password: password,
    name: name,
    age: age,
    sex: sex,
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
  otherImportantLink,
  sex,
  age
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
    age: age,
    sex: sex,
  });
  return data;
};
