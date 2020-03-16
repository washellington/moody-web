import React, { useEffect } from "react";
import NavBar, { WEB_DRAWER_WIDTH } from "../NavBar/NavBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Journal.scss";
import {
  makeStyles,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import DrawerEntry from "../DrawerEntry/DrawerEntry";
import AddEmotionEntry from "../AddEmotionEntry/AddEmotionEntry";
import {
  getMentalStateByMonth,
  getDefaultMoodType,
  logMood,
  fetchMentalStateByMonth
} from "../service";
import { AxiosResponse } from "axios";
import { MentalState, MonthMentalStateDTO, MoodTypeDTO } from "../types";
import { toast } from "react-toastify";
import { ALERT_MSG } from "../alerts";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../reducer";
import { AppActions, SELECT_ENTRY } from "../actions";

import "../Emotion/Emotion.scss";
import LogMoodForm from "../LogMoodForm/LogMoodForm";
import { ref } from "yup";
import { useHistory } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  drawerEntry: {
    width: "25vw"
  }
}));

const Journal: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openAddEntry, setOpenAddEntry] = React.useState(false);
  const selectedDate = useSelector<AppState, Date>(state => state.selectedDate);
  const ref = React.createRef<HTMLFormElement>();

  const mentalStates = useSelector<AppState, MentalState[]>(
    state => state.mentalStates
  );

  const selectedMoodType = useSelector<AppState, string>(
    state => state.selectedMoodTypeId
  );
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!selectedMoodType) {
      getDefaultMoodType().then((data: AxiosResponse<MoodTypeDTO>) => {
        if (!data.data.err) {
          dispatch(AppActions.setMoodTypeId(data.data._id));
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMentalStateByMonth(selectedDate, selectedMoodType));
  }, [selectedMoodType]);

  return (
    <div className={classes.root} id="Journal">
      <Calendar
        formatShortWeekday={(locale, date) =>
          moment(date)
            .format("dd")
            .substr(0, 1)
        }
        maxDetail="month"
        minDetail="month"
        value={selectedDate}
        tileClassName={({ date, view }) => {
          let entry = mentalStates.find(x => {
            return new Date(x.entry_date).getDate() == date.getDate();
          });

          return view === "month" && entry != null
            ? `rating rating-${entry.rating}`
            : null;
        }}
        tileDisabled={({ activeStartDate, date, view }) =>
          date.getTime() > Date.now()
        }
        showNeighboringMonth={false}
        onClickDay={date => {
          let selectedEntry = mentalStates.find(x => {
            return new Date(x.entry_date).getDate() == date.getDate();
          });
          dispatch({
            type: SELECT_ENTRY,
            entry: selectedEntry
          });
          dispatch(AppActions.setSelectedDate(date));
          if (!(selectedEntry !== undefined)) {
            history.push("/log_mood");
          } else {
            history.push("/show_mood");
          }
        }}
        onClickMonth={date => {
          console.log("onClickedMonth: ", date);
        }}
        onActiveDateChange={({ activeStartDate, view }) => {
          if (view == "month") {
            dispatch(AppActions.setMentalStates([]));
            dispatch(
              fetchMentalStateByMonth(activeStartDate, selectedMoodType)
            );
          }
        }}
      />
    </div>
  );
};

export default Journal;
