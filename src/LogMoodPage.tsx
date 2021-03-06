import React, { useEffect } from "react";

import Journal from "./Journal/Journal";
import { useMediaQuery } from "react-responsive";
import AddEmotionEntry, {
  InitialValueProp
} from "./AddEmotionEntry/AddEmotionEntry";
import LogMoodForm from "./LogMoodForm/LogMoodForm";
import NavBar from "./NavBar/NavBar";
import {
  logMood,
  getUserInformation,
  LoginResponse,
  getDefaultMoodType,
  fetchMentalStateByMonth
} from "./service";
import { toast } from "react-toastify";
import { ALERT_MSG } from "./alerts";
import { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppActions } from "./actions";
import { AppState } from "./reducer";
import { MoodTypeDTO, Authentication, DEFAULT_EMOTION_RATING } from "./types";
import { Formik } from "formik";
import * as Yup from "yup";

const LogMoodPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const history = useHistory();
  const dispatch = useDispatch();
  const authentication = useSelector<AppState, Authentication>(
    state => state.authentication as Authentication
  );

  const jwt = useSelector<AppState, Authentication>(
    state => state.authentication as Authentication
  );

  const selectedMoodType = useSelector<AppState, string>(
    state => state.selectedMoodTypeId
  );

  const selectedDate = useSelector<AppState, Date>(state => state.selectedDate);

  const [open, setOpen] = React.useState(true);

  const initialValue: InitialValueProp = {
    emotionRating: DEFAULT_EMOTION_RATING,
    entryDate: new Date(),
    notes: ""
  };

  const validationSchema = Yup.object({
    emotionRating: Yup.number().required(),
    entryDate: Yup.date().required()
  });

  const fetchDefaultMoodType = () => {
    getDefaultMoodType()
      .then((data: AxiosResponse<MoodTypeDTO>) => {
        if (!data.data.err) {
          dispatch(AppActions.setMoodTypeId(data.data._id));
        }
      })
      .catch(err => {
        if (err.response.data)
          toast.error(ALERT_MSG.errorMessage(err.response.data.err));
        else toast.error(err);
      });
  };

  useEffect(() => {
    if (authentication === undefined || !authentication.userId) {
      getUserInformation()
        .then((data: AxiosResponse<LoginResponse>) => {
          if (data.data.errors) history.push("/");
          else {
            dispatch(AppActions.loginUser({ userId: data.data.userId }));
            fetchDefaultMoodType();
          }
        })
        .catch(err => {
          if (err.response.data)
            toast.error(ALERT_MSG.errorMessage(err.response.data.err));
          else toast.error(err);
        });
    } else {
      fetchDefaultMoodType();
    }
  }, []);
  return (
    <>
      {isMobile && (
        <>
          <NavBar />
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log("formik onsubmit");
              logMood({
                rating: values.emotionRating,
                entry_date: selectedDate.getTime(),
                user: jwt.userId,
                date_created: Date.now(),
                notes: values.notes,
                mood_type: selectedMoodType
              })
                .then(data => {
                  console.log("retuned value from log mood", data);
                  dispatch(
                    fetchMentalStateByMonth(values.entryDate, selectedMoodType)
                  );
                  history.push("/journal");
                })
                .catch(err => {
                  if (err.response.data)
                    toast.error(ALERT_MSG.errorMessage(err.response.data.err));
                  else toast.error(err);
                });
            }}
          >
            <LogMoodForm entryDate={selectedDate} />
          </Formik>
        </>
      )}
      {!isMobile && (
        <>
          <NavBar />
          <Journal />
          <AddEmotionEntry
            open={open}
            onCancel={() => {
              history.push("/journal");
            }}
            onClose={() => {
              history.push("/journal");
            }}
            onConfirm={() => history.push("/journal")}
          />
        </>
      )}
    </>
  );
};

export default LogMoodPage;
