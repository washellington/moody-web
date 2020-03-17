import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LandingPage from "./LandingPage/LandingPage";
import * as serviceWorker from "./serviceWorker";
import "./fonts/YuGothR.ttc";
import "typeface-roboto";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Overview from "./Overview/Overview";
import Journal from "./Journal/Journal";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducer";
import loggerMiddleware from "./middleware/logger";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateAccount from "./CreateAccount/CreateAccount";
import JournalPage from "./JournalPage";
import LogMoodPage from "./LogMoodPage";
import ShowMood from "./ShowMood/ShowMood";
import ShowMoodPage from "./ShowMoodPage";

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);

const store = createStore(rootReducer, undefined, middlewareEnhancer);
ReactDOM.render(
  <Provider store={store}>
    <ToastContainer autoClose={false} />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/dashboard" component={Overview} />
        <Route path="/log_mood" component={LogMoodPage} />
        <Route path="/show_mood" component={ShowMoodPage} />
        <Route path="/journal" component={JournalPage} />
        <Route path="/create_account" component={CreateAccount} />
      </Switch>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
