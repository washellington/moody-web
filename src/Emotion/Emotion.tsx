import React from "react";
import { makeStyles } from "@material-ui/core";
import "./Emotion.scss";
const useStyles = makeStyles(theme => ({}));

interface Props {
  rating: number;
}

const Emotion: React.FC<Props> = props => {
  const classes = useStyles();

  const { rating } = props;

  return <div className={`emotion rating-${rating}`}></div>;
};

export default Emotion;
