import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import logo from "./assets/title/moody_title.svg";
import { Route, useHistory } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { TextField } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import ReCAPTCHA from "react-google-recaptcha";
import { AppActions } from "./actions";
import { recoverAccount } from "./service";
import { ALERT_MSG } from "./alerts";
import { AccountRecoveryDTO } from "./types";

interface InitialValueProp {
  email: string;
}
const RecoverAccount: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const initialValue: InitialValueProp = {
    email: ""
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email()
      .required("Email is required")
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log("formik onsubmit");

      dispatch(AppActions.showLoading());
      recoverAccount(values.email)
        .then((resp: AxiosResponse<AccountRecoveryDTO>) => {
          console.log(resp.data);
          history.push("/");
        })
        .catch(err => {
          if (err.response.data)
            toast.error(ALERT_MSG.errorMessage(err.response.data.err));
          else toast.error(err);
        });
    }
  });

  return (
    <div className="App" id="RecoverAccountPage">
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
        <button type="submit">Recover Account</button>
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

export default RecoverAccount;
