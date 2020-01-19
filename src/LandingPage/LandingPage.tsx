import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import logo from "../assets/title/moody_title.svg";
import "./LandingPage.scss";
import { stringify } from "querystring";

interface InitialValueProp {
  email: string;
  password: string;
}
const App: React.FC = () => {
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
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <form id="signUpForm">
        <input name="email" type="text" placeholder="Email" />
        <input name="password" type="text" placeholder="Password" />
        <button type="submit">Login</button>
        <button type="button">Create Account</button>
      </form>
    </div>
  );
};

export default App;
