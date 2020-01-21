import React from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import "./Overview.scss";
import NavBar from "../NavBar/NavBar";
import Emotion from "../Emotion/Emotion";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Overview: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <NavBar />
      Overall Mood
      <Emotion rating={0} />
    </div>
  );
};

export default Overview;
