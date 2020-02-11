import axios from "axios";

const LOGIN_URL = "localhost:1234/auth/login";

export const api = axios.create({
  baseURL: "_URL_",
  timeout: 1000,
  withCredentials: false,
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*" // whatever you want
  }
});

export const loginUser = (email: string, password: string) => {
  return api.post(LOGIN_URL, {
    email,
    password
  });
};
