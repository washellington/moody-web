import {
  LOGIN_USER,
  AppAction,
  SHOW_LOADING,
  HIDE_LOADING,
  RECENT_ENTRIES,
  SELECT_ENTRY,
  Authentication,
  SET_MOOD_TYPE_ID
} from "./actions";
import { MentalState } from "./types";

export interface AppState {
  authentication: Authentication | undefined;
  showLoading: boolean;
  recentEntries: MentalState[];
  selectedEntry: MentalState | undefined;
  selectedMoodTypeId: string;
}
const initialState: AppState = {
  authentication: undefined,
  showLoading: false,
  recentEntries: [],
  selectedEntry: undefined,
  selectedMoodTypeId: ""
};

function MoodyApp(state: AppState = initialState, action: AppAction) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        authentication: action.jwt
      };
    case SHOW_LOADING:
      return {
        ...state,
        showLoading: true
      };
    case HIDE_LOADING:
      return {
        ...state,
        showLoading: false
      };
    case RECENT_ENTRIES:
      return {
        ...state,
        recentEntries: action.entries
      };
    case SELECT_ENTRY:
      return {
        ...state,
        selectedEntry: action.entry
      };
    case SET_MOOD_TYPE_ID:
      return {
        ...state,
        selectedMoodTypeId: action.moodTypeId
      };
    default:
      return initialState;
  }
}

export default MoodyApp;
