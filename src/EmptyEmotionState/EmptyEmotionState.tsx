import React from "react";
import { Route, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavBar from "../NavBar/NavBar";
import emptyStateImage from "../assets/empty_state/embarassed_1_.svg";
import "./EmptyEmotionState.scss";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const EmptyEmotionState: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div id="EmptyStateEmotion">
      <img src={emptyStateImage} className="empty_state_emotions" alt="logo" />
      <p>
        Oops! Looks like you do
        <br /> not have any mood
        <br /> entries
      </p>
      <button
        type="button"
        onClick={() => {
          history.push("/log_mood");
        }}
      >
        Log Mood
      </button>
    </div>
  );
};

export default EmptyEmotionState;
