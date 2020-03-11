import React, { useEffect, useState } from "react";
import { makeStyles, List, Fab } from "@material-ui/core";
import { WEB_DRAWER_WIDTH } from "../NavBar/NavBar";
import Emotion from "../Emotion/Emotion";
import EditIcon from "@material-ui/icons/Edit";

import "./WebOverview.scss";
import EmotionEntryReview from "../EmotionEntryReview/EmotionEntryReview";
import { MentalState, MentalStateOverviewDTO } from "../types";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../reducer";
import { Authentication } from "../types";
import {
  getUserInformation,
  LoginResponse,
  getMentalStateOverview
} from "../service";
import { AxiosResponse } from "axios";
import { AppActions } from "../actions";
import { toast } from "react-toastify";
import { ALERT_MSG } from "../alerts";
const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: WEB_DRAWER_WIDTH
  },
  overviewContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 4vw"
  },
  recentEntryListContainer: {
    //backgroundColor: "#E5E5E5"
  },
  floatLinkRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  fabContainer: {
    right: 25,
    bottom: 25,
    position: "fixed",
    display: "flex",
    justifyContent: "flex-end",
    //paddingRight: 25,
    "& button, & button.MuiFab-root:hover": {
      backgroundColor: "#5a6174",
      color: "white"
    }
  },
  overallMoodContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center"
  },
  overviewStats: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%"
  }
}));

interface WebOverviewProps {
  recentEntries: MentalState[];
}

const WebOverview: React.FC<WebOverviewProps> = props => {
  const classes = useStyles();
  const { recentEntries } = props;
  const loggedInUser = useSelector<AppState, Authentication>(
    state => state.authentication as Authentication
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [avgMood, setAvgMood] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [daysMissed, setDaysMissed] = useState(0);

  const fetchMentalStateOverview = () => {
    getMentalStateOverview()
      .then((data: AxiosResponse<MentalStateOverviewDTO>) => {
        if (!data.data.err) {
          setAvgMood(data.data.averageMood);
          setDaysMissed(data.data.daysMissed);
          setTotalDays(data.data.daysLogged);
        }
      })
      .catch(err => {
        toast.error(ALERT_MSG.errorMessage(err));
      });
  };

  useEffect(() => {
    if (loggedInUser === undefined || !loggedInUser.userId) {
      getUserInformation()
        .then((data: AxiosResponse<LoginResponse>) => {
          if (data.data.errors) history.push("/");
          else {
            dispatch(AppActions.loginUser({ userId: data.data.userId }));
            fetchMentalStateOverview();
          }
        })
        .catch(err => {
          toast.error(ALERT_MSG.errorMessage(err));
        });
    } else {
      fetchMentalStateOverview();
    }
  }, []);
  return (
    <div id="WebOverview" className={classes.root}>
      <h1>Overview</h1>
      <h2>{loggedInUser.fullName}</h2>
      <div className={classes.overviewContainer}>
        <div className={classes.overallMoodContainer}>
          <Emotion rating={2} />
          <div className={classes.overviewStats}>
            <div>
              <h3>Days Logged</h3>
              <span>{totalDays}</span>
            </div>
            <div>
              <h3>Average Mood</h3>
              <span>{avgMood}</span>
            </div>
            <div>
              <h3>Days Missed</h3>
              <span>{daysMissed}</span>
            </div>
          </div>
        </div>
        <div>
          <h2>Recent Entries</h2>
          <div className={classes.floatLinkRight}>
            <a className="accent-link">View Journal</a>
          </div>
          <div className={classes.recentEntryListContainer + " "}>
            {recentEntries.map((x, i) => {
              return (
                <EmotionEntryReview key={`emotion-entry-${i}`} emotion={x} />
              );
            })}{" "}
          </div>
        </div>
        {/* <div>
          <h2>Reports</h2>
        </div> */}
      </div>
      <div className={classes.fabContainer}>
        <Fab
          color="inherit"
          aria-label="log mood"
          onClick={() => history.push("/log_mood")}
        >
          <EditIcon className="fab-button" />
        </Fab>
      </div>
    </div>
  );
};

export default WebOverview;
