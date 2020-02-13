import axios from "axios";

const LOGIN_URL = "authorization/auth";
const CREATE_URL = "/users";
export const api = axios.create({
  baseURL: "http://localhost:1234",
  timeout: 5000,
  withCredentials: false,
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*" // whatever you want
  }
});

export interface LoginResponse {
  user: {
    user_id: number;
  };
}

export const loginUser = (email: string, password: string) => {
  return api.post(LOGIN_URL, {
    email,
    password
  });
};

export const createUser = (email: string, password: string) => {
  return api.put(CREATE_URL, {
    email,
    password
  });
};
