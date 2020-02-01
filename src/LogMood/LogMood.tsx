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

import "./LogMood.scss";
import { useFormik } from "formik";

const useStyles = makeStyles(theme => ({}));

interface Props {
  entryDate: Date;
}

interface InitialValueProp {
  emotionRating: number;
  entryDate: Date;
  notes: string;
}

const LogMood: React.FC<Props> = props => {
  const classes = useStyles();

  const { entryDate } = props;
  const history = useHistory();

  const initialValue: InitialValueProp = {
    emotionRating: DEFAULT_EMOTION_RATING,
    entryDate: entryDate || new Date(),
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
      history.push("/journal");
    }
  });

  return (
    <>
      <NavBar />
      <div id="LogMood">
        <form id="addEmotionForm" onSubmit={formik.handleSubmit}>
          <p>Add</p>
          <p>
            <span>{moment(entryDate).format("MM/DD/YYYY")}</span>
            Entry
          </p>
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
          <button type="submit">Add</button>
          <button type="button">Cancel</button>
        </form>
      </div>
    </>
  );
};

export default LogMood;
