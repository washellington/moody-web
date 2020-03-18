import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { makeStyles, Button, CircularProgress } from "@material-ui/core";
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
  const selectedMoodType = useSelector<AppState, string>(
    state => state.selectedMoodTypeId
  );

  const isLoading = useSelector<AppState, boolean>(state => state.isLoading);

  useEffect(() => {
    dispatch(AppActions.setLoading(true));
    getDefaultMoodType()
      .then((data: AxiosResponse<MoodTypeDTO>) => {
        if (!data.data.err) {
          dispatch(AppActions.setMoodTypeId(data.data._id));
          getRecentMoods(data.data._id).then(data => {
            const recentEmotions = data.data;
            console.log(recentEmotions);
            dispatch(AppActions.setRecentEntries(recentEmotions));
            dispatch(AppActions.setLoading(false));
          });
        } else toast.error(ALERT_MSG.errorMessage(data.data.err as string));
      })
      .catch(err => {
        toast.error(ALERT_MSG.errorMessage(err.response.data.err));
      });
  }, []);

  return (
    <>
      {!isMobile && (
        <>
          <NavBar />
          {isLoading && (
            <div id="loadingContainer">
              <CircularProgress />
            </div>
          )}
          {!isLoading && <WebOverview recentEntries={recentEntries} />}
        </>
      )}
      {isMobile && (
        <>
          <NavBar />
          {isLoading && (
            <div id="loadingContainer">
              <CircularProgress />
            </div>
          )}
          {!isLoading && (
            <div id="Overview">
              <h2>Overview</h2>
              {recentEntries.length > 0 && (
                <div className={classes.overviewContainer}>
                  <div className="flex-center-container">
                    <h1>Overall Mood</h1>
                  </div>
                  <Emotion
                    rating={Math.round(
                      recentEntries.reduce((a, b) => a + b.rating, 0) /
                        recentEntries.length
                    )}
                  />
                  <div className="flex-center-container">
                    <div
                      className={classes.emotionEntryContainer + " container"}
                    >
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
                    <Button
                      className="log-mood-bttn"
                      onClick={() => {
                        history.push("/log_mood");
                      }}
                    >
                      Log Mood
                    </Button>
                  </div>
                </div>
              )}
              {recentEntries.length === 0 && (
                <div className={classes.emptyStateContainer}>
                  <EmptyEmotionState />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Overview;
