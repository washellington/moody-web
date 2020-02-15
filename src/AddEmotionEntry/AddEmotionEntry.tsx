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
  const { open = false } = props;

  const [openDialog, setOpenDialog] = React.useState(open);

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
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
          <Button onClick={() => setOpenDialog(false)} color="primary">
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
