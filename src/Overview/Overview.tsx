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

interface Props {
  recentEmotions: any[];
}
const Overview: React.FC<Props> = props => {
  const classes = useStyles();

  const { recentEmotions } = props;

  return (
    <div>
      <NavBar />
      {(recentEmotions || []).length > 0 && (
        <>
          Overall Mood
          <Emotion rating={0} />
        </>
      )}
    </div>
  );
};

export default Overview;
