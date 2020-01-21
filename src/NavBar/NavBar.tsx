import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  Grid
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import icon from "../assets/icon/icon.svg";

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
  }
}));

const NavBar: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item xs={4}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
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
    </>
  );
};

export default NavBar;
