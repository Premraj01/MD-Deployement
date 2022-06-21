import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, InputBase } from "@material-ui/core";
import CountUp from "react-countup";

// styles
import useStyles from "./styles";
import { Search as SearchIcon } from "@material-ui/icons";
import classNames from "classnames";
// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import JourneyTable from "./components/journeyTable/JourneyTable";
import { useEffect } from "react";
import { getJourneyList } from "../../Actions/journeyActions";
import { getCarList } from "../../Actions/carActions";
import { getDriversList } from "../../Actions/driverActions";
import { Skeleton } from "@mui/material";

export default function Dashboard(props) {
  var [isSearchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [assignedCar, setAssignedCar] = useState(0);
  const [unAssignedCar, setUnAssignedCar] = useState(0);
  const [occupiedDrivers, setOccupiedDrivers] = useState(0);
  const [freeDrivers, setFreeDrivers] = useState(0);
  const [activeDrivers, setActiveDrivers] = useState(0);

  var classes = useStyles();
  const dispatch = useDispatch();
  const driversList = useSelector((state) => state.driversList);
  const { drivers, loading: driverListLoading } = driversList;
  const carList = useSelector((state) => state.carList);
  const { loading: carListLoading, error: carListError, cars } = carList;
  const journeyList = useSelector((state) => state.journeyList);
  const {
    pendingJourneyCount,
    acceptedJourneyCount,
    rejectedJourneyCount,
    loading,
  } = journeyList;

  useEffect(() => {
    dispatch(getCarList());
    dispatch(getJourneyList());
    dispatch(getDriversList());
    calculateCount();
  }, [dispatch]);

  const calculateCount = () => {
    let assignedCarCnt = 0;
    let unAssignedCarCnt = 0;
    cars.map((car) => {
      if (car.carStatus === true) {
        assignedCarCnt++;
      } else {
        unAssignedCarCnt++;
      }
    });
    setAssignedCar(assignedCarCnt);
    setUnAssignedCar(unAssignedCarCnt);

    let occupiedCnt = 0;
    let freeCnt = 0;
    let activeDriverCnt = 0;
    drivers.map((d) => {
      if (d.carId?.length > 0) {
        occupiedCnt++;
      } else {
        if (d.carId?.length < 0) {
          freeCnt++;
        }
      }
      if (d.status === "active") {
        activeDriverCnt++;
      }
    });
    setOccupiedDrivers(occupiedCnt);
    setActiveDrivers(activeDriverCnt);
    setFreeDrivers(freeCnt);
  };
  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          {driverListLoading ? (
            <Box height={380} width={60} style={{ borderRadius: "2px" }}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={390}
                height={180}
              />
            </Box>
          ) : (
            <>
              <Widget
                title="Drivers"
                upperTitle
                bodyClass={classes.fullHeightBody}
                className={classes.card}
              >
                <div className={classes.visitsNumberContainer}>
                  <Grid container item alignItems={"center"}>
                    <Grid item xs={6}>
                      <Typography size="xl" weight="medium" noWrap>
                        <CountUp end={drivers?.length} duration={1} />
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Typography color="text" colorBrightness="secondary" noWrap>
                      Active
                    </Typography>
                    <Typography size="md">
                      {" "}
                      <CountUp end={activeDrivers} duration={1} />
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography color="text" colorBrightness="secondary" noWrap>
                      Free
                    </Typography>
                    <Typography size="md">
                      {" "}
                      <CountUp end={freeDrivers} duration={1} />
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography color="text" colorBrightness="secondary" noWrap>
                      Occupied
                    </Typography>
                    <Typography size="md">
                      {" "}
                      <CountUp end={occupiedDrivers} duration={1} />
                    </Typography>
                  </Grid>
                </Grid>
              </Widget>
            </>
          )}
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          {carListLoading ? (
            <Box>
              {" "}
              <Skeleton variant="rectangular" width={390} height={180} />
            </Box>
          ) : (
            <>
              <Widget
                title="Cars"
                upperTitle
                bodyClass={classes.fullHeightBody}
                className={classes.card}
              >
                <div className={classes.visitsNumberContainer}>
                  <Grid container item alignItems={"center"}>
                    <Grid item xs={12}>
                      <Typography size="xl" weight="medium" noWrap>
                        <CountUp end={cars?.length} duration={1} />
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Typography color="text" colorBrightness="secondary" noWrap>
                      Assigned
                    </Typography>
                    <Typography size="md">
                      {" "}
                      <CountUp end={assignedCar} duration={1} />
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography color="text" colorBrightness="secondary" noWrap>
                      unAssigned
                    </Typography>
                    <Typography size="md">
                      {" "}
                      <CountUp end={unAssignedCar} duration={1} />
                    </Typography>
                  </Grid>
                  <Grid item xs={4}></Grid>
                </Grid>
              </Widget>
            </>
          )}
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          {loading ? (
            <Box>
              {" "}
              <Skeleton variant="rectangular" width={390} height={180} />
            </Box>
          ) : (
            <Widget
              title="Pending Trips"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
              <div className={classes.visitsNumberContainer}>
                <Grid container item alignItems={"center"}>
                  <Grid item xs={12}>
                    <Typography size="xl" weight="medium" noWrap>
                      <CountUp end={pendingJourneyCount} duration={1} />
                      {/* {pendingJourneyCount} */}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <Typography color="text" colorBrightness="secondary" noWrap>
                    Accepted Trips
                  </Typography>
                  <Typography size="md">
                    <CountUp end={acceptedJourneyCount} duration={1} />
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="text" colorBrightness="secondary" noWrap>
                    Rejected Trips
                  </Typography>
                  <Typography size="md">
                    <CountUp end={rejectedJourneyCount} duration={1} />
                  </Typography>
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
            </Widget>
          )}
        </Grid>

        <Grid item xs={12}>
          <Widget
            style={{
              height: "800px",
            }}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Pending Approval Trip
                </Typography>

                <div
                  className={classNames(classes.search, {
                    [classes.searchFocused]: isSearchOpen,
                  })}
                >
                  <div
                    className={classNames(classes.searchIcon, {
                      [classes.searchIconOpened]: isSearchOpen,
                    })}
                    onClick={() => setSearchOpen(!isSearchOpen)}
                  >
                    <SearchIcon classes={{ root: classes.headerIcon }} />
                  </div>
                  <InputBase
                    placeholder="Search by Driver…"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                </div>
              </div>
            }
            upperTitle
            noBodyPadding
            // bodyClass={classes.tableWidget}
          >
            <JourneyTable keyword={keyword} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
