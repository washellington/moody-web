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
import { MentalState, Authentication, DEFAULT_EMOTION_RATING } from "../types";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../reducer";
import * as Yup from "yup";
import moment from "moment";

interface AddEmotionEntryProp {
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
  const { open = false, onCancel, onClose, onConfirm } = props;

  const jwt = useSelector<AppState, Authentication>(
    state => state.authentication as Authentication
  );

  const entryDate = useSelector<AppState, Date>(state => state.selectedDate);

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
        dispatch(
          fetchMentalStateByMonth(new Date(entry.entry_date), entry.mood_type)
        );
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
