import React from "react";
import { makeStyles, List, Fab } from "@material-ui/core";
import { WEB_DRAWER_WIDTH } from "../NavBar/NavBar";
import Emotion from "../Emotion/Emotion";
import EditIcon from "@material-ui/icons/Edit";

import "./WebOverview.scss";
const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: WEB_DRAWER_WIDTH
  },
  overviewContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  recentEntryListContainer: {
    backgroundColor: "#E5E5E5"
  },
  floatLinkRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  fabContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 25,
    "& button, & button.MuiFab-root:hover": {
      backgroundColor: "#5a6174",
      color: "white"
    }
  }
}));

const WebOverview: React.FC = () => {
  const classes = useStyles();

  return (
    <div id="WebOverview" className={classes.root}>
      <h1>Overview</h1>
      <div className={classes.overviewContainer}>
        <div>
          <h2>Overall Mood</h2>
          <Emotion rating={2} />
        </div>
        <div>
          <h2>Recent Entries</h2>
          <div className={classes.floatLinkRight}>
            <a>View Journal</a>
            <div
              className={
                classes.recentEntryListContainer + " recent-list-container"
              }
            >
              <List></List>
            </div>
          </div>
        </div>
        {/* <div>
          <h2>Reports</h2>
        </div> */}
      </div>
      <div className={classes.fabContainer}>
        <Fab color="inherit" aria-label="log mood">
          <EditIcon className="fab-button" />
        </Fab>
      </div>
    </div>
  );
};

export default WebOverview;
