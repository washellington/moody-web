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
import { getMentalStateByMonth, getDefaultMoodType, logMood } from "../service";
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
  const ref = React.createRef<HTMLFormElement>();

  const [mentalStates, setMentalStates] = React.useState<MentalState[]>([]);

  const selectedMoodType = useSelector<AppState, string>(
    state => state.selectedMoodTypeId
  );
  const dispatch = useDispatch();

  const fetchMentalStateByMonth = (date: Date) => {
    getMentalStateByMonth(date.getMonth(), date.getFullYear(), selectedMoodType)
      .then((data: AxiosResponse<MonthMentalStateDTO>) => {
        if (!data.data.err) {
          console.log("Months mental state:", data.data.mental_states);
          setMentalStates(data.data.mental_states);
        }
      })
      .catch(err => {
        toast.error(ALERT_MSG.errorMessage(err));
      });
  };

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
    fetchMentalStateByMonth(new Date());
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
        onClickDay={date => {
          let selectedEntry = mentalStates.find(x => {
            return new Date(x.entry_date).getDate() == date.getDate();
          });
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
            fetchMentalStateByMonth(activeStartDate);
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
      <Dialog
        open={openAddEntry}
        onClose={() => setOpenAddEntry(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Entry"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <LogMoodForm
              ref={ref}
              onSubmit={(entry: MentalState) => {
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
              entryDate={new Date()}
              displayTitle={false}
              displayButtons={false}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddEntry(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (ref.current) {
                ref.current.requestSubmit();
                console.log("onclose");
                setOpenAddEntry(false);
              }
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Journal;
