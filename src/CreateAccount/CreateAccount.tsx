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

interface InitialValueProp {
  email: string;
  password: string;
  retypePassword: string;
}
const CreateAccount: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const initialValue: InitialValueProp = {
    email: "",
    password: "",
    retypePassword: ""
  };

  const validationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required("Password is required"),
    retypePassword: Yup.string()
      .required("Retype password is required")
      .oneOf([Yup.ref("password")], "Passwords must match")
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
      <div className="App" id="LandingPage">
        <form id="signUpForm" onSubmit={formik.handleSubmit}>
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
              type="text"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <span className="error">{formik.errors.password}</span>
            )}
          </div>
          <div className="inputField">
            <label>ReType Password</label>
            <input
              name="retypePassword"
              type="text"
              placeholder="Retype Password"
              onChange={formik.handleChange}
              value={formik.values.retypePassword}
            />
            {formik.errors.password && (
              <span className="error">{formik.errors.retypePassword}</span>
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
