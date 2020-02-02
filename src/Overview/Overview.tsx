import React from "react";
import { Route, useHistory } from "react-router-dom";
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
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    "& h1": {
      width: "100%"
    }
  },
  overviewContainer: {
    // display: "flex"
  },
  buttonContainer: {
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
  const history = useHistory();

  return (
    <>
      <NavBar />
      <div id="Overview">
        {[1].length > 0 && (
          <div className={classes.overviewContainer}>
            <div className="flex-center-container">
              <h1>Overall Mood</h1>
            </div>
            <Emotion rating={3} />
            <div className="flex-center-container">
              <div className={classes.emotionEntryContainer + " container"}>
                <h1>Recent Entries</h1>

                {(
                  recentEmotions || [
                    {
                      rating: 3,
                      notes: "hello",
                      date: new Date()
                    },
                    {
                      rating: 5,
                      notes: "hello",
                      date: new Date()
                    }
                  ]
                ).map((x, i) => {
                  return (
                    <EmotionEntryReview
                      key={`emotion-entry-${i}`}
                      emotion={x}
                    />
                  );
                })}
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <button
                className="log-mood-bttn"
                type="button"
                onClick={() => {
                  history.push("/log_mood");
                }}
              >
                Log Mood
              </button>
            </div>
          </div>
        )}
        {(recentEmotions || [1]).length === 0 && (
          <div className={classes.emptyStateContainer}>
            <EmptyEmotionState />
          </div>
        )}
      </div>
    </>
  );
};

export default Overview;
