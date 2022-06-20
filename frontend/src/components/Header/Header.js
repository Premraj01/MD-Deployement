import React, { Fragment, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
  Link,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
// styles
import useStyles from "./styles";

// components
import { Badge, Typography, Button } from "../Wrappers";
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar";
import { toggleSidebar } from "../../Actions/Layout/LayoutActions";
import { getDriversList } from "../../Actions/driverActions";

// context
// import {
//   useLayoutState,
//   useLayoutDispatch,
//   toggleSidebar,
// } from "../../context/LayoutContext";
// import { useUserDispatch, signOut } from "../../context/UserContext";

const messages = [
  {
    id: 0,
    variant: "warning",
    name: "Jane Hew",
    message: "Hey! How is it going?",
    time: "9:32",
  },
  {
    id: 1,
    variant: "success",
    name: "Lloyd Brown",
    message: "Check out my new Dashboard",
    time: "9:18",
  },
  {
    id: 2,
    variant: "primary",
    name: "Mark Winstein",
    message: "I want rearrange the appointment",
    time: "9:15",
  },
  {
    id: 3,
    variant: "secondary",
    name: "Liana Dutti",
    message: "Good news from sale department",
    time: "9:09",
  },
];

const notifications = [
  { id: 0, color: "warning", message: "Check out this awesome ticket" },
  {
    id: 1,
    color: "success",
    type: "info",
    message: "What is the best way to get ...",
  },
  {
    id: 2,
    color: "secondary",
    type: "notification",
    message: "This is just a simple notification",
  },
  {
    id: 3,
    color: "primary",
    type: "e-commerce",
    message: "12 new orders has arrived today",
  },
];

export default function Header(props) {
  var classes = useStyles();
  const dispatch = useDispatch();

  const layout = useSelector((state) => state.layout);
  const { isSidebarOpened } = layout;

  const [driver, setDriver] = useState([]);
  const [notification, setNotification] = useState(false);

  const driversList = useSelector((state) => state.driversList);
  const { error, drivers } = driversList;

  // local
  var [mailMenu, setMailMenu] = useState(null);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);

  useEffect(() => {
    dispatch(getDriversList());
    console.log("first");
    driversArray();
  }, [dispatch]);

  const driversArray = () => {
    let driverArr = [];
    drivers?.map((d) => {
      // setDriver([...driver, d]);}
      if (d.monthlyTripReading > 1150 && d.status !== "inactive") {
        console.log(d);
        driverArr.push(d);
      }
    });
    setDriver([...driverArr]);
  };
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => dispatch(toggleSidebar())}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Motor Diary
        </Typography>
        <div className={classes.grow} />

        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={(e) => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? driver.length : null}
            color="warning"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>

        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="mail-menu"
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
          MenuListProps={{ className: classes.headerMenuList }}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              New Messages
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="secondary"
            >
              {messages.length} New Messages
            </Typography>
          </div>
          {messages.map((message) => (
            <MenuItem key={message.id} className={classes.messageNotification}>
              <div className={classes.messageNotificationSide}>
                <UserAvatar color={message.variant} name={message.name} />
                <Typography size="sm" color="text" colorBrightness="secondary">
                  {message.time}
                </Typography>
              </div>
              <div
                className={classNames(
                  classes.messageNotificationSide,
                  classes.messageNotificationBodySide,
                )}
              >
                <Typography weight="medium" gutterBottom>
                  {message.name}
                </Typography>
                <Typography color="text" colorBrightness="secondary">
                  {message.message}
                </Typography>
              </div>
            </MenuItem>
          ))}
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.sendMessageButton}
          >
            Send New Message
            <SendIcon className={classes.sendButtonIcon} />
          </Fab>
        </Menu>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {driver.map((notification) => (
            <MenuItem
              key={notification.id}
              // onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <>
                <div className={classes.messageContainer}>
                  <Typography style={{ fontSize: "12px" }}>
                    <span>
                      {notification.firstName} {notification.lastName}
                    </span>{" "}
                    has completed{" "}
                    <span>{notification.monthlyTripReading} Km</span> for this
                    month.
                  </Typography>
                </div>
              </>
            </MenuItem>
          ))}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              John Smith
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="primary"
              href="https://flatlogic.com"
            >
              Flalogic.com
            </Typography>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Tasks
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Messages
          </MenuItem>
          <div className={classes.profileMenuUser}>
            {/* <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
              Sign Out
            </Typography> */}
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
