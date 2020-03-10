import React, { useEffect } from "react";

import Journal from "./Journal/Journal";
import { useMediaQuery } from "react-responsive";
import AddEmotionEntry from "./AddEmotionEntry/AddEmotionEntry";
import LogMoodForm from "./LogMoodForm/LogMoodForm";
import NavBar from "./NavBar/NavBar";
import {
  logMood,
  getUserInformation,
  LoginResponse,
  getDefaultMoodType
} from "./service";
import { toast } from "react-toastify";
import { ALERT_MSG } from "./alerts";
import { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppActions } from "./actions";
import { AppState } from "./reducer";
import { MoodTypeDTO, Authentication } from "./types";

const LogMoodPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const history = useHistory();
  const dispatch = useDispatch();
  const authentication = useSelector<AppState, Authentication>(
    state => state.authentication as Authentication
  );

  const fetchDefaultMoodType = () => {
    getDefaultMoodType()
      .then((data: AxiosResponse<MoodTypeDTO>) => {
        if (!data.data.err) {
          dispatch(AppActions.setMoodTypeId(data.data._id));
        }
      })
      .catch(err => {
        toast.error(ALERT_MSG.errorMessage(err));
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
          toast.error(ALERT_MSG.errorMessage(err));
        });
    } else {
      fetchDefaultMoodType();
    }
  }, []);
  return (
    <>
      {isMobile && (
        <LogMoodForm
          onSubmit={entry => {
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
          }}
        />
      )}
      {!isMobile && (
        <>
          <NavBar />
          <Journal />
          <AddEmotionEntry open={true} />
        </>
      )}
    </>
  );
};

export default LogMoodPage;
