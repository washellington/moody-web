import { LoggedInUser, MentalState } from "./types";

export const LOGIN_USER = "LOGIN_USER";
export const VERIFY_USER = "VERIFY_USER";
export const SHOW_LOADING = "SHOW_LOADING";
export const HIDE_LOADING = "HIDE_LOADING";
export const RECENT_ENTRIES = "RECENT_ENTRIES";
export const SELECT_ENTRY = "SELECT_ENTRY";
export const SET_MOOD_TYPE_ID = "SET_MOOD_TYPE_ID";

export const SET_MENTAL_STATES = "SET_MENTAL_STATES";

export const SET_SELECTED_DATE = "SET_SELECTED_DATE";

interface SetSelectedDate {
  type: typeof SET_SELECTED_DATE;
  date: Date;
}

interface SetMentalStates {
  type: typeof SET_MENTAL_STATES;
  mentalStates: MentalState[];
}

interface SetMoodTypeId {
  type: typeof SET_MOOD_TYPE_ID;
  moodTypeId: string;
}

interface LoginUser {
  type: typeof LOGIN_USER;
  user: LoggedInUser;
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
  | SetMoodTypeId
  | SetMentalStates
  | SetSelectedDate;

const setSelectedDate = (date: Date) => {
  return {
    type: SET_SELECTED_DATE,
    date
  };
};

const setMentalStates = (mentalStates: MentalState[]) => {
  return {
    type: SET_MENTAL_STATES,
    mentalStates
  };
};

const showLoading = () => {
  return {
    type: SHOW_LOADING
  };
};

const loginUser = (user: LoggedInUser) => {
  return {
    type: LOGIN_USER,
    user: user
  };
};

const setRecentEntries = (entries: MentalState) => {
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
  setRecentEntries,
  selectEntry,
  setMoodTypeId,
  setMentalStates,
  setSelectedDate
};
