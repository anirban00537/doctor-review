import request from "@/utils/request";

export const loginApi = async (email, password) => {
  const { data } = await request.post("/auth/login", {
    email: email,
    password: password,
  });
  return data;
};

export const RegisterApi = async (email, password, name) => {
  const { data } = await request.post("/auth/register", {
    email: email,
    password: password,
    name: name,
  });
  return data;
};
