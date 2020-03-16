import React, { RefObject } from "react";
import { Route, useHistory } from "react-router-dom";
import {
  makeStyles,
  TextField,
  TextareaAutosize,
  Button
} from "@material-ui/core";
import NavBar from "../NavBar/NavBar";
import Emotion from "../Emotion/Emotion";
import EmptyEmotionState from "../EmptyEmotionState/EmptyEmotionState";
import EmotionEntryReview from "../EmotionEntryReview/EmotionEntryReview";
import moment from "moment";
import EmotionSlider from "../EmotionSlider/EmotionSlider";
import * as Yup from "yup";

import { useFormik, useFormikContext } from "formik";
import Journal from "../Journal/Journal";
import { useMediaQuery } from "react-responsive";
import AddEmotionEntry, {
  InitialValueProp
} from "../AddEmotionEntry/AddEmotionEntry";
import { logMood, deleteMoodEntry } from "../service";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../reducer";
import { Authentication } from "../types";
import { ALERT_MSG } from "../alerts";
import { toast } from "react-toastify";
import { MentalState } from "../types";
import "./ShowMood.scss";

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "2vw"
  }
}));

interface Props {
  entry: MentalState;
}

const ShowMood: React.FC<Props> = props => {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  // const ref = React.createRef<HTMLFormElement>()
  const { entry } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div id="ShowMood" className={classes.root}>
      <h1>{moment(entry.entry_date).format("MM/DD/YYYY")}</h1>
      <Emotion rating={entry.rating} />
      <div>
        <h2>Note</h2>
        <p>{entry.notes || "No Notes"}</p>
      </div>

      <div className={classes.buttonContainer}>
        <Button
          className="remove-button"
          onClick={() => {
            dispatch(deleteMoodEntry(entry._id as string));
            history.push("/journal");
          }}
        >
          Remove
        </Button>
        <Button
          onClick={() => {
            history.push("/journal");
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ShowMood;
