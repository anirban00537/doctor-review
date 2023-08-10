import axios from "axios";
import Cookie from "js-cookie";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

request.interceptors.request.use((config) => {
  const token = Cookie.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
request.interceptors.response.use((response) => {
  return response;
});

export function apiRequest(base, query) {
  if (query === null) {
    return request(base);
  } else {
    return axios.get(base + query);
  }
}
export default request;
