import React from "react";
import NavBar, { WEB_DRAWER_WIDTH } from "../NavBar/NavBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Journal.scss";
import { makeStyles, Drawer } from "@material-ui/core";
import DrawerEntry from "../DrawerEntry/DrawerEntry";
import AddEmotionEntry from "../AddEmotionEntry/AddEmotionEntry";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginLeft: WEB_DRAWER_WIDTH
  },
  drawerEntry: {
    width: "25vw"
  }
}));

const Journal: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root} id="Journal">
      <Calendar
        onClickDay={() => {
          setOpen(true);
        }}
      />
      <Drawer
        className={classes.drawerEntry}
        anchor="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <DrawerEntry />
      </Drawer>
    </div>
  );
};

export default Journal;
