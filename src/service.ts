import axios, { AxiosResponse } from "axios";
import { MentalState, MonthMentalStateDTO, MentalStateDTO } from "./types";
import { AppActions } from "./actions";
import { toast } from "react-toastify";
import { ALERT_MSG } from "./alerts";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AppState } from "./reducer";
import { Action } from "redux";
const LOGIN_URL = "authorization/auth";
const CREATE_URL = "users";
const RECENT_MOOD_URL = "mental_state/recent";
const OVERVIEW_URL = "mental_state/overview";
const LOG_MOOD = "mental_state";
const DEFAULT_MOOD_TYPE = "mood_type/default";
const GET_USER_INFO = "users/info";
const RECOVER_ACCOUNT = "users/recover_account";
const RESET_PASSWORD = "users/reset_password";
const MENTAL_STATE_BY_MONTH_URL = "mental_state/month";
const DELETE_ENTRY_URL = "mental_state";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
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

export const recoverAccount = (email: string) => {
  return api.post(RECOVER_ACCOUNT, {
    email
  });
};

export const resetPassword = (
  email: string,
  password: string,
  token: string
) => {
  return api.put(RESET_PASSWORD, {
    email,
    password,
    token
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

export const deleteEntry = (id: string) => {
  return api.delete(DELETE_ENTRY_URL + "/" + id);
};

export const getMentalStateByMonth = (
  month: number,
  year: number,
  moodType: string
) => {
  return api.get(MENTAL_STATE_BY_MONTH_URL, {
    params: { month: month, year: year, mood_type_id: moodType }
  });
};

export const fetchMentalStateByMonth = (
  date: Date,
  selectedMoodType: string
): ThunkAction<void, AppState, undefined, Action<string>> => {
  return dispatch => {
    dispatch(AppActions.setLoading(true));
    getMentalStateByMonth(date.getMonth(), date.getFullYear(), selectedMoodType)
      .then((data: AxiosResponse<MonthMentalStateDTO>) => {
        if (!data.data.err) {
          console.log("Months mental state:", data.data.mental_states);
          dispatch(AppActions.setMentalStates(data.data.mental_states));
          dispatch(AppActions.setLoading(false));
        }
      })
      .catch(err => {
        if (err.response.data)
          toast.error(ALERT_MSG.errorMessage(err.response.data.err));
        else toast.error(err);
      });
  };
};

export const deleteMoodEntry = (
  id: string
): ThunkAction<void, AppState, undefined, Action<string>> => {
  return (dispatch, state) => {
    deleteEntry(id)
      .then((data: AxiosResponse<MentalStateDTO>) => {
        if (!data.data.err) {
          console.log("Deleted entry with id:", id);
          dispatch(
            fetchMentalStateByMonth(
              new Date((state().selectedEntry as MentalState).entry_date),
              state().selectedMoodTypeId
            )
          );
        }
      })
      .catch(err => {
        if (err.response.data)
          toast.error(ALERT_MSG.errorMessage(err.response.data.err));
        else toast.error(err);
      });
  };
};
