const INVALID_LOGIN = "Invalid login";
const CREATE_USER_SUCCESS = "User created successfully";
const errorMessage = (msg: string) => {
  return `Error occured: ${msg}`;
};
export const ALERT_MSG = {
  INVALID_LOGIN,
  errorMessage,
  CREATE_USER_SUCCESS
};
