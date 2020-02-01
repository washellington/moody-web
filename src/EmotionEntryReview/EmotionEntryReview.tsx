import { EmotionEntry } from "../Overview/Overview";
import React from "react";
import { makeStyles } from "@material-ui/core";
import "./EmotionEntryReview.scss";
interface Prop {
  emotion: EmotionEntry;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10
  },
  emotionDate: { display: "block", textAlign: "right" },
  emotionNotes: { display: "block", textAlign: "center" }
}));

const EmotionEntryReview: React.FC<Prop> = props => {
  const classes = useStyles();

  const { emotion } = props;

  return (
    <div
      className={
        classes.root + ` emotion-review emotion-review-rating-${emotion.rating}`
      }
    >
      <span className={classes.emotionDate}>{emotion.date.toDateString()}</span>
      <span className={classes.emotionNotes}>{emotion.notes}</span>
      <span className={classes.emotionDate}>{emotion.date.toDateString()}</span>
    </div>
  );
};

export default EmotionEntryReview;
