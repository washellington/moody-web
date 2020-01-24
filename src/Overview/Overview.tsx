import React from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import "./Overview.scss";
import NavBar from "../NavBar/NavBar";
import Emotion from "../Emotion/Emotion";
import EmptyEmotionState from "../EmptyEmotionState/EmptyEmotionState";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  emptyStateContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
    textAlign: "center"
  }
}));

interface Props {
  recentEmotions: any[];
}
const Overview: React.FC<Props> = props => {
  const classes = useStyles();

  const { recentEmotions } = props;

  return (
    <>
      <NavBar />
      {(recentEmotions || []).length > 0 && (
        <>
          Overall Mood
          <Emotion rating={0} />
        </>
      )}
      {(recentEmotions || []).length === 0 && (
        <div className={classes.emptyStateContainer}>
          <EmptyEmotionState />
          <p>
            Oops! Looks like you do
            <br /> not have any mood
            <br /> entries
          </p>
        </div>
      )}
    </>
  );
};

export default Overview;
