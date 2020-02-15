import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import "./Overview.scss";
import NavBar from "../NavBar/NavBar";
import Emotion from "../Emotion/Emotion";
import EmptyEmotionState from "../EmptyEmotionState/EmptyEmotionState";
import EmotionEntryReview from "../EmotionEntryReview/EmotionEntryReview";
import { useMediaQuery } from "react-responsive";
import WebOverview from "../WebOverview/WebOverview";
import { getRecentMoods, getDefaultMoodType } from "../service";
import { AppActions } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../reducer";
import { MentalState, MoodTypeDTO } from "../types";
import { AxiosResponse } from "axios";
import { ALERT_MSG } from "../alerts";
import { toast } from "react-toastify";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  emptyStateContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
    textAlign: "center"
  },
  emotionEntryContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    "& h1": {
      width: "100%"
    }
  },
  overviewContainer: {
    // display: "flex"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center"
  }
}));

interface Props {
  recentEmotions: MentalState[];
}
const Overview: React.FC<Props> = props => {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const { recentEmotions } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const recentEntries = useSelector<AppState, MentalState[]>(
    state => state.recentEntries
  );

  useEffect(() => {
    getRecentMoods().then(data => {
      const recentEmotions = data.data;
      console.log(recentEmotions);
      dispatch(AppActions.getRecentEntries(recentEmotions));
    });

    getDefaultMoodType()
      .then((data: AxiosResponse<MoodTypeDTO>) => {
        if (!data.data.err) dispatch(AppActions.setMoodTypeId(data.data._id));
        else toast.error(ALERT_MSG.errorMessage(data.data.err as string));
      })
      .catch(err => toast.error(ALERT_MSG.errorMessage(err)));
  }, []);

  return (
    <>
      {!isMobile && (
        <>
          <NavBar />
          <WebOverview recentEntries={recentEntries} />
        </>
      )}
      {isMobile && (
        <>
          <NavBar />
          <div id="Overview">
            {recentEntries.length > 0 && (
              <div className={classes.overviewContainer}>
                <div className="flex-center-container">
                  <h1>Overall Mood</h1>
                </div>
                <Emotion rating={3} />
                <div className="flex-center-container">
                  <div className={classes.emotionEntryContainer + " container"}>
                    <h1>Recent Entries</h1>

                    {recentEntries.map((x, i) => {
                      return (
                        <EmotionEntryReview
                          key={`emotion-entry-${i}`}
                          emotion={x}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className={classes.buttonContainer}>
                  <button
                    className="log-mood-bttn"
                    type="button"
                    onClick={() => {
                      history.push("/log_mood");
                    }}
                  >
                    Log Mood
                  </button>
                </div>
              </div>
            )}
            {(recentEmotions || []).length === 0 && (
              <div className={classes.emptyStateContainer}>
                <EmptyEmotionState />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Overview;
