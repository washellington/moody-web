import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import LogMoodForm from "../LogMoodForm/LogMoodForm";

const AddEmotionEntry: React.FC = () => {
  return (
    <>
      <Dialog
        open={true}
        onClose={() => console.log("onclose")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Entry"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <LogMoodForm entryDate={new Date()} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => console.log("onclose")} color="primary">
            Disagree
          </Button>
          <Button onClick={() => console.log("onclose")} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddEmotionEntry;
