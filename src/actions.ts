import { MentalState } from "./types";

export const LOGIN_USER = "LOGIN_USER";
export const VERIFY_USER = "VERIFY_USER";
export const SHOW_LOADING = "SHOW_LOADING";
export const HIDE_LOADING = "HIDE_LOADING";
export const RECENT_ENTRIES = "RECENT_ENTRIES";
export const SELECT_ENTRY = "SELECT_ENTRY";
export const SET_MOOD_TYPE_ID = "SET_MOOD_TYPE_ID";

interface SetMoodTypeId {
  type: typeof SET_MOOD_TYPE_ID;
  moodTypeId: string;
}

interface LoginUser {
  type: typeof LOGIN_USER;
  jwt: Authentication;
}
interface VerifyUser {
  type: typeof VERIFY_USER;
}

interface ShowLoading {
  type: typeof SHOW_LOADING;
}

interface HideLoading {
  type: typeof HIDE_LOADING;
}

interface RecentEntries {
  type: typeof RECENT_ENTRIES;
  entries: MentalState[];
}

interface SelectEntry {
  type: typeof SELECT_ENTRY;
  entry: MentalState;
}

export type AppAction =
  | LoginUser
  | ShowLoading
  | HideLoading
  | RecentEntries
  | SelectEntry
  | SetMoodTypeId;

const showLoading = () => {
  return {
    type: SHOW_LOADING
  };
};

export interface Authentication {
  userId: string;
}

const loginUser = (authentication: Authentication) => {
  return {
    type: LOGIN_USER,
    jwt: authentication
  };
};

const getRecentEntries = (entries: MentalState) => {
  return {
    type: RECENT_ENTRIES,
    entries
  };
};

const selectEntry = (entry: MentalState) => {
  return {
    type: SELECT_ENTRY,
    entry
  };
};

const setMoodTypeId = (moodTypeId: string) => {
  return {
    type: SET_MOOD_TYPE_ID,
    moodTypeId
  };
};

export const AppActions = {
  showLoading,
  loginUser,
  getRecentEntries,
  selectEntry,
  setMoodTypeId
};
