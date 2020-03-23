import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import logo from "./assets/title/moody_title.svg";
import { Route, useHistory, useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { TextField } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import ReCAPTCHA from "react-google-recaptcha";
import { AppActions } from "./actions";
import { recoverAccount, resetPassword } from "./service";
import { ALERT_MSG } from "./alerts";
import { AccountRecoveryDTO } from "./types";

interface InitialValueProp {
  email: string;
  password: string;
  retypePassword: string;
  token: string;
}
const ResetPassword: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const initialValue: InitialValueProp = {
    email: "",
    password: "",
    retypePassword: "",
    token: location.search.split("=")[1]
  };

  console.log(initialValue);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email()
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    retypePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required")
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log("formik onsubmit");

      dispatch(AppActions.showLoading());

      resetPassword(values.email, values.password, values.token)
        .then(data => {
          toast.success("Successfully reset password");
          history.push("/");
        })
        .catch(err => {
          toast.error(ALERT_MSG.errorMessage(err.response.data.err));
          console.log(err.response, err.response.data.err);
        });
    }
  });

  return (
    <div className="App" id="ResetPasswordPage">
      <img src={logo} className="App-logo" alt="logo" />
      <form id="recoverAccountForm" onSubmit={formik.handleSubmit}>
        <div className="inputField">
          <label>Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <span className="error">{formik.errors.email}</span>
          )}
        </div>
        <div className="inputField">
          <label>Password</label>
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
        <div className="inputField">
          <label>Confirm Password</label>
          <input
            name="retypePassword"
            type="password"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            value={formik.values.retypePassword}
          />
          {formik.errors.retypePassword && (
            <span className="error">{formik.errors.retypePassword}</span>
          )}
        </div>
        <button type="submit">Reset Password</button>
        <button
          type="button"
          onClick={() => {
            history.push("/");
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
