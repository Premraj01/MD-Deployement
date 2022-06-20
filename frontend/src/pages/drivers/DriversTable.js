import React, { useEffect, useState } from "react";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Table,
  IconButton,
  Slide,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";

import Skeleton from "@mui/material/Skeleton";
import useStyles from "../dashboard/styles";
import { TbEditCircle } from "react-icons/tb";
import {
  RemoveCircleOutline as InactiveIcon,
  HistoryRounded as HistoryIcon,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getDriversList, updateDriver } from "../../Actions/driverActions";
import { getCarList, updateCar } from "../../Actions/carActions";
import { displayDateFormate } from "../../Services/DateFormate";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DriversTable = ({ keyword, status }) => {
  const dispatch = useDispatch();

  var classes = useStyles();

  const [dialogue, setDialogue] = useState(false);
  const [driver, setDriver] = useState({});
  const [car, setCar] = useState({});

  const driversList = useSelector((state) => state.driversList);
  const { loading, error, drivers } = driversList;
  const carList = useSelector((state) => state.carList);
  const { loading: carListLoading, error: carListError, cars } = carList;

  useEffect(() => {
    dispatch(getDriversList(keyword));
    dispatch(getCarList());
    if (window.location.href.includes("driverInfo")) {
      window.location.replace("#/app/drivers/list");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [dispatch, keyword]);

  const dischargeDriver = (driver, car) => {
    dispatch(
      updateDriver({
        _id: driver._id,
        firstName: driver.firstName,
        lastName: driver.lastName,
        mobileNumber: driver.mobileNumber,
        password: driver.password,
        gender: driver.gender,
        licence: driver.licence,
        image: driver.photo,
        licenceImage: driver.licenceImage,
        carAssignedDate: driver.carAssignedDate,
        designation: driver.designation,
        birthDate: driver.birthDate,
        carId: null,
        status: "inactive",
      }),
      dispatch(
        updateCar({
          _id: car._id,
          carName: car.carName,
          RCNumber: car.RCNumber,
          PUCNumber: car.PUCNumber,
          carNumber: car.carNumber,
          insuranceNumber: car.insuranceNumber,

          carImage: car.carImage,
          carRCTCNo: car.carRCTCNo,
          carRCTCImage: car.carRCTCImage,
          RCBookImage: car.RCBookImage,
          PUCImage: car.PUCImage,
          PUCStartDate: car.PUCStartDate,
          PUCEndDate: car.PUCEndDate,
          insuranceImage: car.insuranceImage,
          insuranceStartDate: car.insuranceStartDate,
          insuranceEndDate: car.insuranceEndDate,
          carFitnessImage: car.carFitnessImage,
          carFitnessStartDate: car.carFitnessStartDate,
          carFitnessEndDate: car.carFitnessEndDate,
          carPurchaseInvoice: car.carPurchaseInvoice,
          carPurchaseInvoiceDate: car.carPurchaseInvoiceDate,

          carStatus: false,
        }),
      ),
    );
    window.location.reload();
  };

  return (
    <>
      {loading || carListLoading ? (
        <Paper sx={{ width: "100%", overflow: "hidden", height: "200px" }}>
          <TableContainer>
            <Table stickyHeader className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Car</TableCell>
                  <TableCell>Joining Date</TableCell>
                  <TableCell>Monthly Reading</TableCell>
                  {/* <TableCell>Status</TableCell> */}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(10)].map((_, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <>
          <Paper sx={{ width: "100%", overflow: "hidden", height: "200px" }}>
            <TableContainer>
              <Table stickyHeader className="mb-0">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Car</TableCell>
                    <TableCell>Joining Date</TableCell>
                    <TableCell>Monthly Reading</TableCell>
                    {/* <TableCell>Status</TableCell> */}
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                {status === "active" ? (
                  <TableBody>
                    {drivers
                      ?.slice(0)
                      .reverse()
                      .map((d, i) => {
                        if (d.status === "active") {
                          return (
                            <TableRow key={d._id}>
                              <TableCell>
                                {d.firstName}&nbsp; {d.lastName}
                              </TableCell>
                              <TableCell>{d.mobileNumber}</TableCell>
                              {d.carId ? (
                                cars?.map((car) => {
                                  if (d.carId === car._id) {
                                    return (
                                      <TableCell>{car.carNumber}</TableCell>
                                    );
                                  }
                                })
                              ) : (
                                <TableCell>-</TableCell>
                              )}

                              <TableCell>
                                {displayDateFormate(d.carAssignedDate)}
                              </TableCell>
                              <TableCell>{d.monthlyTripReading}</TableCell>

                              <TableCell>
                                <div className={classes.mainChartHeader}>
                                  <div
                                    className={classes.mainChartHeaderLabels}
                                  >
                                    <Link to={`/app/drivers/edit/${d._id}`}>
                                      <IconButton
                                        color="primary"
                                        className={classes.noPadding}
                                      >
                                        <TbEditCircle />
                                      </IconButton>
                                    </Link>

                                    <IconButton
                                      color="secondary"
                                      className={classes.noPadding}
                                      onClick={() => {
                                        setDialogue(true);
                                        setDriver(d);
                                        d.carId &&
                                          cars.map(
                                            (car) =>
                                              d.carId === car._id &&
                                              setCar(car),
                                          );
                                      }}
                                    >
                                      <InactiveIcon />
                                    </IconButton>

                                    <Link to={`/app/drivers/history/${d._id}`}>
                                      <IconButton
                                        color="primary"
                                        className={classes.noPadding}
                                      >
                                        <HistoryIcon />
                                      </IconButton>
                                    </Link>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                  </TableBody>
                ) : (
                  <TableBody>
                    {drivers
                      .slice(0)
                      .reverse()
                      .map((d, i) => {
                        if (d.status === "inactive") {
                          return (
                            <TableRow key={i}>
                              <TableCell>
                                {d.firstName}&nbsp; {d.lastName}
                              </TableCell>
                              <TableCell>{d.mobileNumber}</TableCell>
                              {d.carId ? (
                                cars?.map((car) => {
                                  if (d.carId === car._id) {
                                    return (
                                      <TableCell>{car.carNumber}</TableCell>
                                    );
                                  }
                                })
                              ) : (
                                <TableCell>-</TableCell>
                              )}

                              <TableCell>
                                {displayDateFormate(d.carAssignedDate)}
                              </TableCell>
                              <TableCell>{d.monthlyTripReading}</TableCell>

                              <TableCell>
                                <div className={classes.mainChartHeader}>
                                  <div
                                    className={classes.mainChartHeaderLabels}
                                  >
                                    <div>
                                      <IconButton
                                        color="primary"
                                        className={classes.noPadding}
                                      >
                                        <TbEditCircle />
                                      </IconButton>
                                    </div>

                                    <div>
                                      <IconButton
                                        color="primary"
                                        className={classes.noPadding}
                                      >
                                        <HistoryIcon />
                                      </IconButton>
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <Dialog
              onClose={() => setDialogue(false)}
              open={dialogue}
              TransitionComponent={Transition}
            >
              <DialogTitle>{`Car will be removed for the Driver..!!`}</DialogTitle>

              <DialogActions>
                <Button onClick={() => dischargeDriver(driver, car)}>OK</Button>
                <Button autoFocus onClick={() => setDialogue(false)}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </>
      )}
    </>
  );
};

export default DriversTable;
