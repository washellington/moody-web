import React, { useEffect } from "react";

import Journal from "./Journal/Journal";
import { useMediaQuery } from "react-responsive";
import AddEmotionEntry, {
  InitialValueProp
} from "./AddEmotionEntry/AddEmotionEntry";
import LogMoodForm from "./LogMoodForm/LogMoodForm";
import NavBar, { WEB_DRAWER_WIDTH } from "./NavBar/NavBar";
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
import {
  MoodTypeDTO,
  Authentication,
  DEFAULT_EMOTION_RATING,
  MentalState
} from "./types";
import { Formik } from "formik";
import * as Yup from "yup";
import ShowMood from "./ShowMood/ShowMood";
import { makeStyles, Drawer } from "@material-ui/core";
import DrawerEntry from "./DrawerEntry/DrawerEntry";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100%",
    flexDirection: "column"
  },
  drawerEntry: {
    width: "25vw"
  }
}));

const ShowMoodPage: React.FC = () => {
  const classes = useStyles();

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const history = useHistory();
  const dispatch = useDispatch();
  const authentication = useSelector<AppState, Authentication>(
    state => state.authentication as Authentication
  );

  const jwt = useSelector<AppState, Authentication>(
    state => state.authentication as Authentication
  );

  const selectedEntry = useSelector<AppState, MentalState>(
    state => state.selectedEntry as MentalState
  );

  useEffect(() => {
    console.log(selectedEntry);
    if (selectedEntry === undefined) history.push("/journal");
  }, []);

  const [open, setOpen] = React.useState(true);

  return (
    <div id="ShowMoodPage" className={classes.root}>
      {isMobile && (
        <>
          <NavBar />
          {selectedEntry && <ShowMood entry={selectedEntry} />}
        </>
      )}
      {!isMobile && (
        <>
          <NavBar />
          <Journal />
          <Drawer
            className={classes.drawerEntry}
            anchor="right"
            onClose={() => setOpen(false)}
            open={open}
          >
            <DrawerEntry
              onDelete={() => {
                setOpen(false);
              }}
            />
          </Drawer>
        </>
      )}
    </div>
  );
};

export default ShowMoodPage;
