import React, { useEffect } from "react";
import NavBar, { WEB_DRAWER_WIDTH } from "../NavBar/NavBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Journal.scss";
import { makeStyles, Drawer } from "@material-ui/core";
import DrawerEntry from "../DrawerEntry/DrawerEntry";
import AddEmotionEntry from "../AddEmotionEntry/AddEmotionEntry";
import { getMentalStateByMonth, getDefaultMoodType } from "../service";
import { AxiosResponse } from "axios";
import { MentalState, MonthMentalStateDTO, MoodTypeDTO } from "../types";
import { toast } from "react-toastify";
import { ALERT_MSG } from "../alerts";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../reducer";
import { AppActions } from "../actions";

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
  const [mentalState, setMentalStates] = React.useState<MentalState[]>([]);

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
        onClickDay={() => {
          setOpen(true);
        }}
        onClickMonth={date => {
          console.log("onClickedMonth: ", date);
        }}
        onActiveDateChange={viewCallBack => {
          if (viewCallBack.view == "month") {
            fetchMentalStateByMonth(viewCallBack.activeStartDate);
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
    </div>
  );
};

export default Journal;
