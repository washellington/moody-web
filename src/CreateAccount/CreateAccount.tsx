import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import logo from "../assets/title/moody_title.svg";
import { Route, useHistory } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { AppActions } from "../actions";
import { loginUser, LoginResponse, createUser } from "../service";
import { toast } from "react-toastify";
import { ALERT_MSG } from "../alerts";
import { TextField } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import ReCAPTCHA from "react-google-recaptcha";

interface InitialValueProp {
  email: string;
  password: string;
  retypePassword: string;
  recaptcha: boolean;
}
const CreateAccount: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const initialValue: InitialValueProp = {
    email: "",
    password: "",
    retypePassword: "",
    recaptcha: false
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    retypePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    recaptcha: Yup.boolean()
      .required("You must validate the reCAPTCHA ")
      .oneOf([true], "You must validate the reCAPTCHA")
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log("formik onsubmit");

      dispatch(AppActions.showLoading());
      dispatch(
        createUser(values.email, values.password)
          .then((resp: AxiosResponse) => {
            const { data } = resp;
            if (resp.status == 200) {
              toast.success(ALERT_MSG.CREATE_USER_SUCCESS);
              history.push("/");
            } else {
              toast.error(ALERT_MSG.errorMessage(resp.data));
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
      <div className="App" id="CreateAccountPage">
        <img src={logo} className="App-logo" alt="logo" />
        <form id="signUpForm" onSubmit={formik.handleSubmit}>
          <div className="inputField">
            <label>Username</label>
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
          <div className="inputField">
            <ReCAPTCHA
              sitekey="6Ld6yOEUAAAAANWfMAZyY9k3L-D2XMRT-nBVLzXM"
              onChange={() => {
                formik.setFieldValue("recaptcha", true);
                formik.handleChange("recaptcha");
              }}
              onExpired={() => {
                formik.setFieldValue("recaptcha", false);
                formik.handleChange("recaptcha");
              }}
              onErrored={() => {
                formik.setFieldValue("recaptcha", false);
                formik.handleChange("recaptcha");
              }}
            />
            {formik.errors.recaptcha && (
              <span className="error">{formik.errors.recaptcha}</span>
            )}
          </div>
          <button type="submit">Create Account</button>
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
    </Route>
  );
};

export default CreateAccount;
