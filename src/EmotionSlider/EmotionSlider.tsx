import React from "react";
import { makeStyles, Slider } from "@material-ui/core";
import Emotion from "../Emotion/Emotion";
import EmptyEmotionState from "../EmptyEmotionState/EmptyEmotionState";
import EmotionEntryReview from "../EmotionEntryReview/EmotionEntryReview";

const useStyles = makeStyles(theme => ({}));

interface Props {
  onChange: (rating: number) => void;
}
export const DEFAULT_EMOTION_RATING = 2;
const EmotionSlider: React.FC<Props> = props => {
  const classes = useStyles();

  const { onChange } = props;

  const [rating, setRating] = React.useState(DEFAULT_EMOTION_RATING);

  return (
    <>
      <Emotion rating={rating} />
      <Slider
        defaultValue={DEFAULT_EMOTION_RATING}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={4}
        onChange={(event: any, newValue: number | number[]) => {
          setRating(newValue as number);
          onChange(newValue as number);
        }}
      />
    </>
  );
};

export default EmotionSlider;
