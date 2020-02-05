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
import { useMediaQuery } from "react-responsive";
import HomeIcon from "@material-ui/icons/Home";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SettingsIcon from "@material-ui/icons/Settings";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

import "./NavBar.scss";

export const WEB_DRAWER_WIDTH = 50;

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
  webDrawer: {
    width: WEB_DRAWER_WIDTH,
    height: "100vh",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  webAppMargin: {
    marginLeft: WEB_DRAWER_WIDTH
  },
  drawerLink: {
    color: "#5A6174",
    fontWeight: "bold"
  },
  centerContent: {
    justifyContent: "center"
  },
  webDrawerList: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    padding: "15vh 0"
  }
}));

const NavBar: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const [open, setOpen] = useState(!isMobile);

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

  const MENU_LIST = isMobile
    ? ["Dashboard", "Journal", "Reports"]
    : ["Dashboard", "Journal", "Settings", "Logout"];

  const sideList = () => (
    <div
      className={!isMobile ? classes.webDrawer : classes.drawer}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className={isMobile ? "" : classes.webDrawerList}>
        {MENU_LIST.map(text =>
          isMobile ? (
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
          ) : (
            <ListItem
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
              button
              key={text}
            >
              {text == "Dashboard" && (
                <ListItemIcon>
                  <HomeIcon
                    className={`${
                      history.location.pathname == "/dashboard" ? "active" : ""
                    } web-nav-icon`}
                  />
                </ListItemIcon>
              )}
              {text == "Journal" && (
                <ListItemIcon>
                  <DateRangeIcon
                    className={`${
                      history.location.pathname == "/journal" ? "active" : ""
                    } web-nav-icon`}
                  />
                </ListItemIcon>
              )}
              {text == "Settings" && (
                <ListItemIcon>
                  <SettingsIcon
                    className={`${
                      history.location.pathname == "/settings" ? "active" : ""
                    } web-nav-icon`}
                  />
                </ListItemIcon>
              )}
              {text == "Logout" && (
                <ListItemIcon>
                  <PowerSettingsNewIcon className="web-nav-icon power-icon" />
                </ListItemIcon>
              )}
            </ListItem>
          )
        )}
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Grid container className={!isMobile ? classes.centerContent : ""}>
            {isMobile && (
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
            )}
            <Grid item xs={4} className={classes.centerGrid}>
              <img src={icon} className={classes.appIcon} alt="logo" />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={!isMobile ? "permanent" : "temporary"}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {sideList()}
      </Drawer>
    </>
  );
};

export default NavBar;
