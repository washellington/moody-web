import React from "react";
import NavBar, { WEB_DRAWER_WIDTH } from "../NavBar/NavBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  makeStyles,
  Drawer,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent
} from "@material-ui/core";
import Emotion from "../Emotion/Emotion";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./DrawerEntry.scss";
import EmotionSlider from "../EmotionSlider/EmotionSlider";
import { MentalState } from "../types";
import { useSelector } from "react-redux";
import { AppState } from "../reducer";
const useStyles = makeStyles(theme => ({
  root: {
    width: "30vw",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  drawerEntry: {
    width: "25vw"
  },
  returnToJournalLink: {
    display: "flex",
    alignItems: "center",
    color: "#f78b45",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "YuGoth",
    justifyContent: "flex-end",
    marginRight: 10,
    marginBottom: 5
  },
  buttonContainer: {},
  drawerEntryTopContainer: {
    width: "100%"
  }
}));

const DrawerEntry: React.FC = () => {
  const classes = useStyles();

  const entry = useSelector<AppState, MentalState>(
    state => state.selectedEntry as MentalState
  );

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div id="DrawerEntry" className={classes.root}>
        <div className={classes.drawerEntryTopContainer}>
          <a className={classes.returnToJournalLink}>
            <ArrowBackIosIcon />
            Return to Journal
          </a>
          <Emotion rating={entry ? entry.rating - 1 : undefined} />
        </div>
        <div className={classes.buttonContainer}>
          <Button variant="contained" className="edit-button">
            Edit
          </Button>
          <Button className="remove-button">Remove</Button>
        </div>
      </div>
    </>
  );
};

export default DrawerEntry;
