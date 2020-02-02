import React from "react";
import { makeStyles } from "@material-ui/core";
import { WEB_DRAWER_WIDTH } from "../NavBar/NavBar";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: WEB_DRAWER_WIDTH
  },
  overviewContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const WebOverview: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <h1>Overview</h1>
        <div className={classes.overviewContainer}>
          <div>
            <h2>Overall Mood</h2>
          </div>
          <div>
            <h2>Recent Entries</h2>View Journal
          </div>
          <div>
            <h2>Reports</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebOverview;
