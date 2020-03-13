import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import LogMoodForm from "../LogMoodForm/LogMoodForm";
import { logMood, fetchMentalStateByMonth } from "../service";
import { ALERT_MSG } from "../alerts";
import { toast } from "react-toastify";
import { MentalState, Authentication } from "../types";
import { DEFAULT_EMOTION_RATING } from "../EmotionSlider/EmotionSlider";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../reducer";
import * as Yup from "yup";
import moment from "moment";

interface AddEmotionEntryProp {
  entryDate?: Date;
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface InitialValueProp {
  emotionRating: number;
  entryDate: Date;
  notes: string;
}

const AddEmotionEntry: React.FC<AddEmotionEntryProp> = props => {
  const {
    open = false,
    onCancel,
    onClose,
    onConfirm,
    entryDate = new Date()
  } = props;

  const jwt = useSelector<AppState, Authentication>(
    state => state.authentication as Authentication
  );

  const dispatch = useDispatch();
  const selectedMoodType = useSelector<AppState, string>(
    state => state.selectedMoodTypeId
  );

  const addMentalState = (entry: MentalState) => {
    logMood({
      rating: entry.rating,
      entry_date: entry.entry_date,
      user: entry.user,
      date_created: entry.date_created,
      notes: entry.notes,
      mood_type: entry.mood_type
    })
      .then(data => {
        console.log("retuned value from log mood", data);
        //          history.push("/journal");
      })
      .catch(err => {
        toast.error(ALERT_MSG.errorMessage(err));
        console.error("Returned with an error", err);
      });
  };

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

  console.log("entry date = ", entryDate);
  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log("formik onsubmit");
          addMentalState({
            rating: values.emotionRating,
            entry_date: entryDate.getTime(),
            user: jwt.userId,
            date_created: Date.now(),
            notes: values.notes,
            mood_type: selectedMoodType
          });
          dispatch(fetchMentalStateByMonth(entryDate, selectedMoodType));
        }}
      >
        {({
          submitForm
          /* and other goodies */
        }) => (
          <Dialog
            open={open}
            onClose={() => onClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{`Add ${moment(
              entryDate
            ).format("MM/DD/YYYY")} Entry`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <LogMoodForm
                  entryDate={entryDate}
                  displayTitle={false}
                  displayButtons={false}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => onCancel()} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("onclose");
                  submitForm();
                  onConfirm();
                }}
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Formik>
    </>
  );
};

export default AddEmotionEntry;
