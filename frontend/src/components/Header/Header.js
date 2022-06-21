import React, { Fragment, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Fab,
  Dialog,
  Slide,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Send as SendIcon,
  Close as ArrowBackIcon,
  ExitToApp as LogoutIcon,
} from "@material-ui/icons";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
// styles
import useStyles from "./styles";

// components
import { Badge, Typography, Button } from "../Wrappers/Wrappers";
import UserAvatar from "../UserAvatar/UserAvatar";
import { toggleSidebar } from "../../Actions/Layout/LayoutActions";
import { getDriversList } from "../../Actions/driverActions";
import { logout } from "../../Actions/adminActions";
import MonthlyTripReading from "./MonthlyTripReading";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Header(props) {
  var classes = useStyles();
  const dispatch = useDispatch();

  const layout = useSelector((state) => state.layout);
  const { isSidebarOpened } = layout;

  const [admin, setAdmin] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const driversList = useSelector((state) => state.driversList);
  const { error, drivers } = driversList;

  // local
  var [mailMenu, setMailMenu] = useState(null);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);

  useEffect(() => {
    dispatch(getDriversList());
    setAdmin(JSON.parse(localStorage.getItem("adminInfo")));
  }, [dispatch]);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => dispatch(toggleSidebar())}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse
          )}
        >
          {isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
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
            badgeContent={isNotificationsUnread ? "" : null}
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
                  classes.messageNotificationBodySide
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
          <MonthlyTripReading drivers={drivers} />
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
              {admin?.firstName} {admin?.lastName}
            </Typography>
            <Typography className={classes.profileMenuLink}>
              {admin?.mobileNumber}
            </Typography>
          </div>
          {/* <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Tasks
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Messages
          </MenuItem> */}
          <div className={classes.profileMenuUser}>
            {/* <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => setShowAlert(false)}
            >
              Sign Out
            </Typography> */}
            <Button
              variant="outlined"
              color="primary"
              startIcon={<LogoutIcon />}
              onClick={() => setShowAlert(true)}
            >
              signOut
            </Button>
          </div>
        </Menu>
      </Toolbar>
      <Dialog
        onClose={() => setShowAlert(false)}
        open={showAlert}
        TransitionComponent={Transition}
      >
        <DialogTitle>{`Please confirm that you want to Logout..! `}</DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              dispatch(logout());
              window.location.reload();
            }}
          >
            Logout
          </Button>
          <Button autoFocus onClick={() => setShowAlert(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
