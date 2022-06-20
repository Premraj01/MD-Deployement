import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import Skeleton from "@mui/material/Skeleton";
import moment from "moment";
import { TbEditCircle } from "react-icons/tb";
import {
  RemoveRedEyeRounded as ViewIcon,
  HistoryRounded as HistoryIcon,
  Cancel as CloseIcon,
} from "@material-ui/icons";
import useStyles from "../dashboard/styles";
import { Notifications as AlertIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarList } from "../../Actions/carActions";
import { Link } from "react-router-dom";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const CarsTable = ({ keyword }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [modalCar, setModalCar] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [carPopover, setCarPopover] = useState();
  const driversList = useSelector((state) => state.driversList);
  const { loading } = driversList;

  const carList = useSelector((state) => state.carList);
  const { loading: carListLoading, cars } = carList;

  useEffect(() => {
    dispatch(getCarList(keyword));
    if (window.location.search.includes("driverInfo")) {
      window.location.replace("/app/cars/list");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [dispatch, keyword]);

  return (
    <>
      {loading || carListLoading ? (
        <Paper sx={{ width: "100%", overflow: "hidden", height: "200px" }}>
          <TableContainer>
            <Table stickyHeader className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Car</TableCell>
                  <TableCell>Insurance No.</TableCell>
                  <TableCell>RC-TC No.</TableCell>
                  <TableCell>PUC No</TableCell>
                  <TableCell>Remark</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(10)].map((_) => {
                  return (
                    <TableRow>
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
        <Paper sx={{ width: "100%", overflow: "hidden", height: "200px" }}>
          <TableContainer>
            <Table stickyHeader className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Car</TableCell>
                  <TableCell>Insurance No.</TableCell>
                  <TableCell>RC-TC No.</TableCell>
                  <TableCell>PUC No</TableCell>
                  <TableCell>Remark</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cars
                  ?.sort((a, b) => {
                    return a?.carStatus
                      ?.toString()
                      ?.localeCompare(b.carStatus?.toString());
                  })
                  ?.map((car, i) => {
                    return (
                      <TableRow key={car._id}>
                        <TableCell>{car.carNumber}</TableCell>
                        <TableCell>{car?.insuranceNumber}</TableCell>
                        {car.carRCTCNo?.length > 20 ? (
                          <TableCell>
                            {car.carRCTCNo?.slice(0, 20)}...
                          </TableCell>
                        ) : (
                          <TableCell>{car.carRCTCNo}</TableCell>
                        )}
                        <TableCell>{car?.PUCNumber}</TableCell>
                        <TableCell>
                          {(moment(car?.PUCEndDate).diff(Date.now(), "days") <
                            5 &&
                            moment(car?.PUCEndDate).diff(Date.now(), "days") >
                              0) ||
                          (moment(car?.insuranceEndDate).diff(
                            Date.now(),
                            "days",
                          ) < 5 &&
                            moment(car?.insuranceEndDate).diff(
                              Date.now(),
                              "days",
                            ) > 0) ||
                          (moment(car?.carFitnessEndDate).diff(
                            Date.now(),
                            "days",
                          ) < 5 &&
                            moment(car?.carFitnessEndDate).diff(
                              Date.now(),
                              "days",
                            ) > 0) ? (
                            <IconButton color="secondary">
                              <AlertIcon
                                onClick={() => {
                                  setShowPopover(true);
                                  setCarPopover(car);
                                }}
                              ></AlertIcon>
                            </IconButton>
                          ) : moment(car?.PUCEndDate).diff(Date.now(), "days") <
                              0 ||
                            moment(car?.insuranceEndDate).diff(
                              Date.now(),
                              "days",
                            ) < 0 ||
                            moment(carPopover?.carFitnessEndDate).diff(
                              Date.now(),
                              "days",
                            ) < 0 ? (
                            <IconButton color="secondary">
                              <AlertIcon
                                onClick={() => {
                                  setShowPopover(true);
                                  setCarPopover(car);
                                }}
                              ></AlertIcon>
                            </IconButton>
                          ) : (
                            <></>
                          )}
                        </TableCell>
                        {car.carStatus === true ? (
                          <TableCell style={{ color: "green" }}>
                            {" "}
                            Assigned{" "}
                          </TableCell>
                        ) : (
                          <TableCell style={{ color: "red" }}>
                            Unassigned
                          </TableCell>
                        )}

                        <TableCell>
                          {" "}
                          <div className={classes.mainChartHeader}>
                            <div className={classes.mainChartHeaderLabels}>
                              <div>
                                <Link to={`/app/cars/edit/${car._id}`}>
                                  <IconButton
                                    color="primary"
                                    className={classes.noPadding}
                                  >
                                    <TbEditCircle />
                                  </IconButton>
                                </Link>
                              </div>
                              <div>
                                <IconButton
                                  className={classes.noPadding}
                                  onClick={() => {
                                    setShowModal(true);
                                    setModalCar(car);
                                  }}
                                >
                                  <ViewIcon />
                                </IconButton>
                              </div>
                              <div>
                                <Link to={`/app/cars/history/${car._id}`}>
                                  <IconButton
                                    color="primary"
                                    className={classes.noPadding}
                                  >
                                    <HistoryIcon />
                                  </IconButton>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
            open={showModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* <img
                alt=""
                style={{ height: "100%", width: "100%" }}
                src={`${modalCar.carImage}`}
              /> */}{" "}
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                // style={{
                //   position: "f",
                // }}
              >
                <Grid item xs={11}></Grid>
                <Grid item xs={1}>
                  <Typography
                    style={{
                      margin: "6px",
                      fontWidth: "bold",
                      position: "sticky",
                    }}
                  >
                    <CloseIcon
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => setShowModal(false)}
                    />
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid>
                    <Typography>Car Image</Typography>
                    <img
                      alt=""
                      style={{ height: "200px", width: "200px" }}
                      src={`${modalCar.carImage}`}
                    />
                  </Grid>
                  <Grid>
                    <Typography>RCTC Image</Typography>
                    <img
                      alt=""
                      style={{ height: "200px", width: "200px" }}
                      src={`${modalCar.carRCTCImage}`}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid>
                    <Typography>RC Book</Typography>
                    <img
                      alt=""
                      style={{ height: "200px", width: "200px" }}
                      src={`${modalCar.RCBookImage}`}
                    />
                  </Grid>
                  <Grid>
                    <Typography>PUC Image</Typography>
                    <img
                      alt=""
                      style={{ height: "200px", width: "200px" }}
                      src={`${modalCar.PUCImage}`}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid>
                    <Typography>Insurance Image</Typography>
                    <img
                      alt=""
                      style={{ height: "200px", width: "200px" }}
                      src={`${modalCar.insuranceImage}`}
                    />
                  </Grid>
                  <Grid>
                    <Typography>Fitness Crt</Typography>
                    <img
                      alt=""
                      style={{ height: "200px", width: "200px" }}
                      src={`${modalCar.carFitnessImage}`}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </Paper>
      )}
    </>
  );
};

export default CarsTable;
