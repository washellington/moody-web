import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import logo from "../assets/title/moody_title.svg";
import "./LandingPage.scss";
import { stringify } from "querystring";
import { Route } from "react-router-dom";

interface InitialValueProp {
  email: string;
  password: string;
}
const LandingPage: React.FC = () => {
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
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <Route path="/">
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <form id="signUpForm" onSubmit={formik.handleSubmit}>
          <div className="inputField">
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
          <button type="submit">Login</button>
          <button type="button">Create Account</button>
        </form>
      </div>
    </Route>
  );
};

export default LandingPage;
