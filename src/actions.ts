export const LOGIN_USER = "LOGIN_USER";
export const VERIFY_USER = "VERIFY_USER";
export const SHOW_LOADING = "SHOW_LOADING";
export const HIDE_LOADING = "HIDE_LOADING";
interface LoginUser {
  type: typeof LOGIN_USER;
  jwt: Object;
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

export type AppAction = LoginUser | ShowLoading | HideLoading;

const showLoading = () => {
  return {
    type: SHOW_LOADING
  };
};

interface Authentication {
  user_id: number;
}

const loginUser = (authentication: Authentication) => {
  return {
    type: LOGIN_USER,
    jwt: authentication
  };
};

export const AppActions = {
  showLoading,
  loginUser
};
