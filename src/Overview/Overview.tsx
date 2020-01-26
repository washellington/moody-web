import React from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import "./Overview.scss";
import NavBar from "../NavBar/NavBar";
import Emotion from "../Emotion/Emotion";
import EmptyEmotionState from "../EmptyEmotionState/EmptyEmotionState";
import EmotionEntryReview from "../EmotionEntryReview/EmotionEntryReview";

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
  },
  emotionEntryContainer: {
    display: "flex",
    justifyContent: "center"
  }
}));

export interface EmotionEntry {
  rating: number;
  notes: string;
  date: Date;
}

interface Props {
  recentEmotions: EmotionEntry[];
}
const Overview: React.FC<Props> = props => {
  const classes = useStyles();

  const { recentEmotions } = props;

  return (
    <>
      <NavBar />
      {[1].length > 0 && (
        <>
          Overall Mood
          <Emotion rating={3} />
          Recent Entries
          <div className={classes.emotionEntryContainer}>
            {(
              recentEmotions || [
                {
                  rating: 3,
                  notes: "hello",
                  date: new Date()
                }
              ]
            ).map((x, i) => {
              return (
                <EmotionEntryReview key={`emotion-entry-${i}`} emotion={x} />
              );
            })}
          </div>
        </>
      )}
      {(recentEmotions || [1]).length === 0 && (
        <div className={classes.emptyStateContainer}>
          <EmptyEmotionState />
        </div>
      )}
    </>
  );
};

export default Overview;
