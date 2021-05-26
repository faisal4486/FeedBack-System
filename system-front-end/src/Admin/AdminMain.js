import React, { useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssessmentIcon from "@material-ui/icons/Assessment";
import HomeIcon from "@material-ui/icons/Home";
import Main from "./Main.js";
import { Link } from "react-router-dom";
import useStyles from "./AdminMainCss.js";
import AppsIcon from "@material-ui/icons/Apps";
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';
import { useTheme } from "@material-ui/core/styles";

export default function MiniDrawer(props) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    console.log("hello")
    history.push("/student/evaluation");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Admin DashBoard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,

          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>

        <Divider />

        <List>
          <ListItem button component={Link} to={"/admin"}>
            <ListItemIcon button>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Home" className={classes.linkTag} />
          </ListItem>

          <ListItem button component={Link} to={"/admin/department"}>
            <ListItemIcon button>
              <AppsIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Department" className={classes.linkTag} />
          </ListItem>

          <ListItem button component={Link} to={"/admin/Report"}>
            <ListItemIcon button>
              <AssessmentIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Report" className={classes.linkTag} />
          </ListItem>

          <ListItem button component={Link} to={"/admin/Reset"}>
            <ListItemIcon button>
              <CreateIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Reset" style={{ textDecoration: "none" }} />
          </ListItem>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Main name={props.componentName} />
      </main>
    </div>
  );
}
