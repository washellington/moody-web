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

interface AddEmotionEntryProp {
  open: boolean;
}

const AddEmotionEntry: React.FC<AddEmotionEntryProp> = props => {
  const { open } = props;

  return (
    <>
      <Dialog
        open={open}
        onClose={() => console.log("onclose")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Entry"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <LogMoodForm
              entryDate={new Date()}
              displayTitle={false}
              displayButtons={false}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => console.log("onclose")} color="primary">
            Cancel
          </Button>
          <Button onClick={() => console.log("onclose")} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddEmotionEntry;
