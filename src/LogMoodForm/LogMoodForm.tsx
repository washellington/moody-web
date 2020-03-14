import React, { RefObject } from "react";
import { Route, useHistory } from "react-router-dom";
import { makeStyles, TextField, TextareaAutosize } from "@material-ui/core";
import NavBar from "../NavBar/NavBar";
import Emotion from "../Emotion/Emotion";
import EmptyEmotionState from "../EmptyEmotionState/EmptyEmotionState";
import EmotionEntryReview from "../EmotionEntryReview/EmotionEntryReview";
import moment from "moment";
import EmotionSlider from "../EmotionSlider/EmotionSlider";
import * as Yup from "yup";

import "./LogMoodForm.scss";
import { useFormik, useFormikContext } from "formik";
import Journal from "../Journal/Journal";
import { useMediaQuery } from "react-responsive";
import AddEmotionEntry, {
  InitialValueProp
} from "../AddEmotionEntry/AddEmotionEntry";
import { logMood } from "../service";
import { useSelector } from "react-redux";
import { AppState } from "../reducer";
import { Authentication } from "../types";
import { ALERT_MSG } from "../alerts";
import { toast } from "react-toastify";
import { MentalState } from "../types";

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    width: "100%"
  }
}));

interface Props {
  entryDate?: Date;
  displayTitle?: boolean;
  displayButtons?: boolean;
}

const LogMoodForm: React.FC<Props> = props => {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  // const ref = React.createRef<HTMLFormElement>()
  const {
    displayButtons = true,
    displayTitle = true,
    entryDate = new Date()
  } = props;
  const history = useHistory();

  const {
    values,
    submitForm,
    setFieldValue,
    handleChange,
    handleSubmit
  } = useFormikContext<InitialValueProp>();

  return (
    <>
      <form id="addEmotionForm" onSubmit={handleSubmit}>
        {displayTitle && (
          <p>
            Add
            <br />
            <span>{`${moment(entryDate).format("MM/DD/YYYY")} Entry`}</span>
          </p>
        )}
        <EmotionSlider
          onChange={rating => {
            setFieldValue("emotionRating", rating);
            handleChange("emotionRating");
          }}
        />
        <TextField
          name="notes"
          value={values.notes}
          onChange={handleChange}
          rows={5}
          multiline
          variant="outlined"
          placeholder="Elaborate your mood..."
        />
        {displayButtons && (
          <div className={classes.buttonContainer}>
            <button type="submit">Add</button>
            <button
              type="button"
              onClick={() => {
                history.push("/journal");
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default LogMoodForm;
