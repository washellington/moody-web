import React from "react";
import { makeStyles } from "@material-ui/core";
import "./EmotionEntryReview.scss";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
import { MentalState } from "../types";

interface Prop {
  emotion: MentalState;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10
  },
  emotionDate: { display: "block", textAlign: "right", padding: 5 },
  emotionNotes: { display: "block", textAlign: "center" },
  emotioNotesWeb: {
    padding: 10,
    display: "block",
    textAlign: "left",
    fontFamily: "Roboto-Regular"
  }
}));

const EmotionEntryReview: React.FC<Prop> = props => {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const { emotion } = props;

  return (
    <div
      className={
        classes.root + ` emotion-review emotion-review-rating-${emotion.rating}`
      }
    >
      <span className={classes.emotionDate}>
        {moment(emotion.entry_date).format("MM/DD/YYYY")}
      </span>
      <span
        className={isMobile ? classes.emotionNotes : classes.emotioNotesWeb}
      >
        {emotion.notes || "No Notes"}
      </span>
      <span></span>
    </div>
  );
};

export default EmotionEntryReview;
