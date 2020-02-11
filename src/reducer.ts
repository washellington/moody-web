import { LOGIN_USER, AppAction, SHOW_LOADING, HIDE_LOADING } from "./actions";

interface AppState {
  authentication: Object | undefined;
  showLoading: boolean;
}
const initialState: AppState = {
  authentication: undefined,
  showLoading: false
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
    default:
      return initialState;
  }
}

export default MoodyApp;
