import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Drawer,
  ListItemText
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import icon from "../assets/icon/icon.svg";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar: {
    backgroundColor: "#fefefe"
  },
  menu: {
    color: "#F78B45",
    flexGrow: 0
  },
  menuContainer: {
    flex: 0,
    width: "fit-content"
  },
  centerGrid: {
    display: "flex",
    justifyContent: "center"
  },
  appIcon: {
    width: 40
  },
  drawer: {
    width: "50vw"
  },
  drawerLink: {
    color: "#5A6174",
    fontWeight: "bold"
  }
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const sideList = () => (
    <div
      className={classes.drawer}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Dashboard", "Journal", "Reports"].map(text => (
          <ListItem button key={text}>
            <ListItemText
              classes={{
                primary: classes.drawerLink
              }}
              onClick={() => {
                switch (text) {
                  case "Dashboard":
                    history.push("/dashboard");
                    break;
                  case "Journal":
                    history.push("/journal");
                    break;
                  // case "Reports":
                  //   history.push("");
                  //   break;
                  default:
                    break;
                }
              }}
              primary={text}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item xs={4}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                className={classes.menuContainer}
              >
                <Menu className={classes.menu} />
              </IconButton>
            </Grid>
            <Grid item xs={4} className={classes.centerGrid}>
              <img src={icon} className={classes.appIcon} alt="logo" />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
    </>
  );
};

export default NavBar;
