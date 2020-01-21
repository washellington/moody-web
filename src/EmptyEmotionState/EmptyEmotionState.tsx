import React from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import "./Overview.scss";
import NavBar from "../NavBar/NavBar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const EmptyEmotionState: React.FC = () => {
  const classes = useStyles();

  return <></>;
};

export default EmptyEmotionState;
