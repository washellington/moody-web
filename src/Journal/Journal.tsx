import React from "react";
import NavBar, { WEB_DRAWER_WIDTH } from "../NavBar/NavBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Journal.scss";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginLeft: WEB_DRAWER_WIDTH
  }
}));

const Journal: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <div className={classes.root} id="Journal">
        <Calendar />
      </div>
    </>
  );
};

export default Journal;
