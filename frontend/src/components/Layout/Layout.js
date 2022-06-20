import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from "@material-ui/core";
import Icon from "@mdi/react";

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from "@mdi/js";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Maps from "../../pages/maps";
// import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import DriversList from "../../pages/drivers/DriversList";
import AddDriver from "../../pages/drivers/Add/AddDriverForm";
import EditDriver from "../../pages/drivers/Edit/EditDriverForm";
import DriversHistory from "../../pages/drivers/History/DriversHistory";
import CarsList from "../../pages/cars/CarsList";
import AddCarForm1 from "../../pages/cars/Add/AddCarForm1";
import AddCarForm2 from "../../pages/cars/Add/AddCarForm2";
import EditCarForm1 from "../../pages/cars/Edit/EditCarForm1";
import EditCarForm2 from "../../pages/cars/Edit/EditCarForm2";
import ExpenseList from "../../pages/expenses/ExpenseList";
import FuelHistory from "../../pages/fuel/FuelHistory";
import CarsHistory from "../../pages/cars/History/CarsHistory";
import MaintenanceList from "../../pages/maintenance/MaintenanceList";
import AddMaintenance from "../../pages/maintenance/Add/AddMaintenance";
import EditMaintenance from "../../pages/maintenance/Edit/EditMaintenance";

// context
// import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  // var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: true,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} exact />
            <Route
              exact
              path="/app/drivers"
              render={() => <Redirect to="/app/drivers/list" />}
            />
            <Route path="/app/drivers/list" component={DriversList} exact />
            <Route path="/app/drivers/add" component={AddDriver} exact />
            <Route
              path="/app/drivers/history/:id"
              component={DriversHistory}
              exact
            />
            <Route path="/app/drivers/edit/:id" component={EditDriver} exact />

            <Route
              exact
              path="/app/cars"
              render={() => <Redirect to="/app/cars/list" />}
            />
            <Route path="/app/cars/list" component={CarsList} exact />
            <Route path="/app/cars/add" component={AddCarForm1} exact />
            <Route path="/app/cars/add/step2" component={AddCarForm2} exact />
            <Route path="/app/cars/history/:id" component={CarsHistory} exact />
            <Route path="/app/cars/edit/:id" component={EditCarForm1} exact />
            <Route path="/app/cars/edit2/:id" component={EditCarForm2} exact />
            <Route path="/app/expenses" component={ExpenseList} />
            <Route path="/app/fuelhistory" component={FuelHistory} />
            <Route
              path="/app/carmaintenance"
              component={MaintenanceList}
              exact
            />
            <Route
              path="/app/carMaintenance/add/:carId"
              component={AddMaintenance}
              exact
            />
            <Route
              path="/app/carMaintenance/edit/:carId/:maintenanceId"
              component={EditMaintenance}
              exact
            />
          </Switch>
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <div>
              <Link
                color={"primary"}
                href={"https://flatlogic.com/"}
                target={"_blank"}
                className={classes.link}
              >
                Flatlogic
              </Link>
              <Link
                color={"primary"}
                href={"https://flatlogic.com/about"}
                target={"_blank"}
                className={classes.link}
              >
                About Us
              </Link>
              <Link
                color={"primary"}
                href={"https://flatlogic.com/blog"}
                target={"_blank"}
                className={classes.link}
              >
                Blog
              </Link>
            </div>
            <div>
              <Link
                href={"https://www.facebook.com/flatlogic"}
                target={"_blank"}
              >
                <IconButton aria-label="facebook">
                  <Icon path={FacebookIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={"https://twitter.com/flatlogic"} target={"_blank"}>
                <IconButton aria-label="twitter">
                  <Icon path={TwitterIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={"https://github.com/flatlogic"} target={"_blank"}>
                <IconButton aria-label="github" style={{ marginRight: -12 }}>
                  <Icon path={GithubIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
            </div>
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
