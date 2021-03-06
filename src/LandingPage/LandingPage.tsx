import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import logo from "../assets/title/moody_title.svg";
import "./LandingPage.scss";
import { Route, useHistory } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { AppActions } from "../actions";
import { loginUser, LoginResponse } from "../service";
import { toast } from "react-toastify";
import { ALERT_MSG } from "../alerts";

interface InitialValueProp {
  email: string;
  password: string;
}
const LandingPage: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const initialValue: InitialValueProp = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required()
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log("formik onsubmit");

      dispatch(AppActions.showLoading());
      dispatch(
        loginUser(values.email, values.password)
          .then((resp: AxiosResponse<LoginResponse>) => {
            const { data } = resp;
            if (!data.errors) {
              console.log(data);
              localStorage.setItem("token", data.token);
              dispatch(AppActions.loginUser({ userId: data.userId }));
              window.location.href = "/dashboard";
            } else {
              toast.error(ALERT_MSG.INVALID_LOGIN);
            }
          })
          .catch(err => {
            toast.error(ALERT_MSG.errorMessage(err));
          })
      );
    }
  });

  return (
    <Route path="/">
      <div className="App" id="LandingPage">
        <img src={logo} className="App-logo" alt="logo" />
        <form id="signUpForm" onSubmit={formik.handleSubmit}>
          <div className="inputField">
            <input
              name="email"
              type="text"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <span className="error">{formik.errors.email}</span>
            )}
          </div>
          <div className="inputField">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <span className="error">{formik.errors.password}</span>
            )}
          </div>
          <button type="submit">Login</button>
          <button
            type="button"
            onClick={() => {
              history.push("/create_account");
            }}
          >
            Create Account
          </button>
          <a
            onClick={() => {
              history.push("/recover_account");
            }}
          >
            Recover Account
          </a>
        </form>
      </div>
    </Route>
  );
};

export default LandingPage;
