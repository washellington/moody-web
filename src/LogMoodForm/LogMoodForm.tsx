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

const useStyles = makeStyles(theme => ({}));

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

  console.log("Logmoodform entryDate= ", entryDate);
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
        <TextareaAutosize
          name="notes"
          value={values.notes}
          onChange={handleChange}
          rowsMin={5}
          placeholder="Elaborate your mood..."
        />
        {displayButtons && (
          <>
            <button type="submit" onClick={() => submitForm()}>
              Add
            </button>
            <button type="button">Cancel</button>
          </>
        )}
      </form>
    </>
  );
};

export default LogMoodForm;
