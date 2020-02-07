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

import { useFormik } from "formik";
import LogMoodForm from "../LogMoodForm/LogMoodForm";

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
        <LogMoodForm entryDate={new Date()} />
      </div>
    </>
  );
};

export default LogMood;
