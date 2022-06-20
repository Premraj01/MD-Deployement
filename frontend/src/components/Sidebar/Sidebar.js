import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  AccountBalance as ExpenseIcon,
  People as DriversIcon,
  TimeToLeave as CarsIcon,
  LocalGasStation as FuelIcon,
  ExitToApp as LogoutIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { MdEngineering as MaintenanceIcon } from "react-icons/md";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import { useDispatch, useSelector } from "react-redux";

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Drivers",
    link: "/app/drivers",
    icon: <DriversIcon />,
    children: [
      { label: "List", link: "/app/drivers/list" },
      { label: "Add Driver", link: "/app/drivers/add" },
    ],
  },
  {
    id: 2,
    label: "Cars",
    link: "/app/cars",
    icon: <CarsIcon />,
    children: [
      { label: "List", link: "/app/cars/list" },
      { label: "Add Car", link: "/app/cars/add" },
    ],
  },
  {
    id: 3,
    label: "Expenses",
    link: "/app/expenses",
    icon: <ExpenseIcon />,
  },
  {
    id: 4,
    label: "Fuel History",
    link: "/app/fuelhistory",
    icon: <FuelIcon />,
    // children: [
    //   { label: "Icons", link: "/app/ui/icons" },
    //   { label: "Charts", link: "/app/ui/charts" },
    //   { label: "Maps", link: "/app/ui/maps" },
    // ],
  },

  {
    id: 5,
    label: "Car Maintenance",
    link: "/app/carmaintenance",
    icon: <MaintenanceIcon size={24} />,
  },
  {
    id: 6,
    label: "Logout",
    link: "https://flatlogic.com/forum",
    icon: <LogoutIcon />,
  },
  {
    id: 7,
    type: "divider",
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();
  var classes = useStyles();
  const dispatch = useDispatch();

  const layout = useSelector((state) => state.layout);
  const { isSidebarOpened } = layout;

  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton
        // onClick={() => toggleSidebar(layoutDispatch)}
        >
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
