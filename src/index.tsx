import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./LandingPage/LandingPage";
import * as serviceWorker from "./serviceWorker";
import "./fonts/YuGothR.ttc";
import "typeface-roboto";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Overview from "./Overview/Overview";
import LogMood from "./LogMood/LogMood";
import Journal from "./Journal/Journal";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/dashboard" component={Overview} />
      <Route path="/log_mood" component={LogMood} />
      <Route path="/journal" component={Journal} />
    </Switch>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
