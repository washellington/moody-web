import React from "react";
import { Route, useHistory } from "react-router-dom";
import { makeStyles, TextField, TextareaAutosize } from "@material-ui/core";
import NavBar from "../NavBar/NavBar";
import Emotion from "../Emotion/Emotion";
import EmptyEmotionState from "../EmptyEmotionState/EmptyEmotionState";
import EmotionEntryReview from "../EmotionEntryReview/EmotionEntryReview";
import moment from "moment";
import EmotionSlider, {
  DEFAULT_EMOTION_RATING
} from "../EmotionSlider/EmotionSlider";
import * as Yup from "yup";

import "./LogMoodForm.scss";
import { useFormik } from "formik";
import Journal from "../Journal/Journal";
import { useMediaQuery } from "react-responsive";
import AddEmotionEntry from "../AddEmotionEntry/AddEmotionEntry";
import { logMood } from "../service";
import { useSelector } from "react-redux";
import { AppState } from "../reducer";
import { Authentication } from "../actions";
import { ALERT_MSG } from "../alerts";
import { toast } from "react-toastify";

const useStyles = makeStyles(theme => ({}));

interface Props {
  entryDate?: Date;
  displayTitle?: boolean;
  displayButtons?: boolean;
}

interface InitialValueProp {
  emotionRating: number;
  entryDate: Date;
  notes: string;
}

const LogMoodForm: React.FC<Props> = props => {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const jwt = useSelector<AppState, Authentication>(
    state => state.authentication as Authentication
  );

  const selectedMoodType = useSelector<AppState, string>(
    state => state.selectedMoodTypeId
  );

  const {
    displayButtons = true,
    displayTitle = true,
    entryDate = new Date()
  } = props;
  const history = useHistory();

  const initialValue: InitialValueProp = {
    emotionRating: DEFAULT_EMOTION_RATING,
    entryDate: entryDate,
    notes: ""
  };

  const validationSchema = Yup.object({
    emotionRating: Yup.number().required(),
    entryDate: Yup.date().required(),
    notes: Yup.string().required()
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log("formik onsubmit");
      logMood({
        rating: values.emotionRating,
        entry_date: values.entryDate.getTime(),
        user: jwt.userId,
        date_created: Date.now(),
        notes: values.notes,
        mood_type: selectedMoodType
      })
        .then(data => {
          console.log("retuned value from log mood", data);
          //          history.push("/journal");
        })
        .catch(err => {
          toast.error(ALERT_MSG.errorMessage(err));
          console.error("Returned with an error", err);
        });
    }
  });

  return (
    <>
      <form id="addEmotionForm" onSubmit={formik.handleSubmit}>
        {displayTitle && (
          <p>
            Add
            <br />
            <span>{`${moment(entryDate).format("MM/DD/YYYY")} Entry`}</span>
          </p>
        )}
        <EmotionSlider
          onChange={rating => {
            formik.setFieldValue("emotionRating", rating);
            formik.handleChange("emotionRating");
          }}
        />
        <TextareaAutosize
          name="notes"
          value={formik.values.notes}
          onChange={formik.handleChange}
          rowsMin={5}
          placeholder="Elaborate your mood..."
        />
        {displayButtons && (
          <>
            <button type="submit">Add</button>
            <button type="button">Cancel</button>
          </>
        )}
      </form>
    </>
  );
};

export default LogMoodForm;
