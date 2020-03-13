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

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginLeft: WEB_DRAWER_WIDTH
  },
  drawerEntry: {
    width: "25vw"
  }
}));

const Journal: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openAddEntry, setOpenAddEntry] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const ref = React.createRef<HTMLFormElement>();

  const mentalStates = useSelector<AppState, MentalState[]>(
    state => state.mentalStates
  );

  const selectedMoodType = useSelector<AppState, string>(
    state => state.selectedMoodTypeId
  );
  const dispatch = useDispatch();

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
    dispatch(fetchMentalStateByMonth(new Date(), selectedMoodType));
  }, [selectedMoodType]);

  return (
    <div className={classes.root} id="Journal">
      <Calendar
        tileClassName={({ date, view }) => {
          let entry = mentalStates.find(x => {
            return new Date(x.entry_date).getDate() == date.getDate();
          });

          return view === "month" && entry != null
            ? `rating-${entry.rating}`
            : null;
        }}
        showNeighboringMonth={false}
        onClickDay={date => {
          let selectedEntry = mentalStates.find(x => {
            return new Date(x.entry_date).getDate() == date.getDate();
          });
          setSelectedDate(date);
          setOpenAddEntry(!(selectedEntry !== undefined));
          setOpen(selectedEntry !== undefined);
          dispatch({
            type: SELECT_ENTRY,
            entry: selectedEntry
          });
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
      <Drawer
        className={classes.drawerEntry}
        anchor="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <DrawerEntry />
      </Drawer>
      <AddEmotionEntry
        open={openAddEntry}
        entryDate={selectedDate}
        onClose={() => setOpenAddEntry(false)}
        onCancel={() => setOpenAddEntry(false)}
        onConfirm={() => setOpenAddEntry(false)}
      />
    </div>
  );
};

export default Journal;
