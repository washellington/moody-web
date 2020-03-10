import axios from "axios";
import { MentalState } from "./types";

const LOGIN_URL = "authorization/auth";
const CREATE_URL = "users";
const RECENT_MOOD_URL = "mental_state/recent";
const OVERVIEW_URL = "mental_state/overview";
const LOG_MOOD = "mental_state";
const DEFAULT_MOOD_TYPE = "mood_type/default";
const GET_USER_INFO = "users/info";

export const api = axios.create({
  baseURL: "http://localhost:1234",
  timeout: 5000,
  withCredentials: false,
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${localStorage.token}`
  }
});

export interface LoginResponse {
  userId: string;
  token: string;
  refreshToken: string;
  errors?: string;
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

export const getRecentMoods = (moodTypeId: string) => {
  return api.get(RECENT_MOOD_URL, {
    params: { mood_type_id: moodTypeId }
  });
};

export const logMood = (entry: MentalState) => {
  return api.put(LOG_MOOD, entry);
};

export const getDefaultMoodType = () => {
  return api.get(DEFAULT_MOOD_TYPE);
};

export const getUserInformation = () => {
  return api.get(GET_USER_INFO);
};

export const getMentalStateOverview = () => {
  return api.get(OVERVIEW_URL);
};
