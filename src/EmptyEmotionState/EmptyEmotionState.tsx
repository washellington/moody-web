import React from "react";
import { Route } from "react-router-dom";
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

  return (
    <>
      <img src={emptyStateImage} className="empty_state_emotions" alt="logo" />
    </>
  );
};

export default EmptyEmotionState;