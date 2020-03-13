import {
  LOGIN_USER,
  AppAction,
  SHOW_LOADING,
  HIDE_LOADING,
  RECENT_ENTRIES,
  SELECT_ENTRY,
  SET_MOOD_TYPE_ID,
  SET_MENTAL_STATES
} from "./actions";
import { MentalState, Authentication } from "./types";

export interface AppState {
  authentication: Authentication;
  showLoading: boolean;
  recentEntries: MentalState[];
  selectedEntry: MentalState | undefined;
  selectedMoodTypeId: string;
  mentalStates: MentalState[];
}
const initialState: AppState = {
  authentication: {
    userId: "",
    email: "",
    fullName: ""
  },
  showLoading: false,
  recentEntries: [],
  selectedEntry: undefined,
  selectedMoodTypeId: "",
  mentalStates: []
};

function MoodyApp(state: AppState = initialState, action: AppAction) {
  switch (action.type) {
    case SET_MENTAL_STATES: {
      return {
        ...state,
        mentalStates: action.mentalStates
      };
    }
    case LOGIN_USER:
      return {
        ...state,
        authentication: {
          ...state.authentication,
          userId: action.user.userId
        }
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
