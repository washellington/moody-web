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
import { logMood } from "../service";
import { ALERT_MSG } from "../alerts";
import { toast } from "react-toastify";
import { MentalState } from "../types";

interface AddEmotionEntryProp {
  open: boolean;
}

const AddEmotionEntry: React.FC<AddEmotionEntryProp> = props => {
  const { open = false } = props;

  const [openDialog, setOpenDialog] = React.useState(open);

  const ref = React.createRef<HTMLFormElement>();

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
              ref={ref}
              onSubmit={(entry: MentalState) => {
                logMood({
                  rating: entry.rating,
                  entry_date: entry.entry_date,
                  user: entry.user,
                  date_created: entry.date_created,
                  notes: entry.notes,
                  mood_type: entry.mood_type
                })
                  .then(data => {
                    console.log("retuned value from log mood", data);
                    //          history.push("/journal");
                  })
                  .catch(err => {
                    toast.error(ALERT_MSG.errorMessage(err));
                    console.error("Returned with an error", err);
                  });
              }}
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
          <Button
            onClick={() => {
              if (ref.current) ref.current.requestSubmit();
              console.log("onclose");
              setOpenDialog(false);
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddEmotionEntry;
