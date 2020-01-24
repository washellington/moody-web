import React from "react";
import { makeStyles } from "@material-ui/core";
import "./Emotion.scss";
import emotion_0 from "../assets/ratings/emotions-4.png";
import emotion_1 from "../assets/ratings/emotions-3.png";
import emotion_2 from "../assets/ratings/emotions-2.png";
import emotion_3 from "../assets/ratings/emotions-1.png";
import emotion_4 from "../assets/ratings/emotions-0.png";

const useStyles = makeStyles(theme => ({}));

interface Props {
  rating: number;
}

const Emotion: React.FC<Props> = props => {
  const classes = useStyles();

  const { rating } = props;

  const getEmotion = (rating: number) => {
    switch (rating) {
      case 0:
        return <img src={emotion_0} className="emoji" alt="logo" />;
      case 4:
        return <img src={emotion_4} className="emoji" alt="logo" />;
      case 3:
        return <img src={emotion_3} className="emoji" alt="logo" />;
      case 2:
        return <img src={emotion_2} className="emoji" alt="logo" />;
      case 1:
        return <img src={emotion_1} className="emoji" alt="logo" />;
    }
  };

  return (
    <div className={`emotion rating-${rating + 1}`}>
      <div className="emotion-container">{getEmotion(rating)}</div>
    </div>
  );
};

export default Emotion;
