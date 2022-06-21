import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getJourneyList,
  updateJourney,
} from "../../../../Actions/journeyActions";
import Skeleton from "@mui/material/Skeleton";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Slide,
  TableContainer,
  Paper,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import {
  CheckCircle as AcceptIcon,
  Cancel as CloseIcon,
} from "@material-ui/icons";

import useStyles from "../../styles";
import { displayDateFormate } from "../../../../Services/DateFormate";
import Widget from "../../../../components/Widget/Widget";
import Notification from "../../../../components/Notification/Notification";

const states = {
  accepted: "success",
  pending: "warning",
  rejected: "secondary",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const JourneyTable = ({ keyword }) => {
  const dispatch = useDispatch();

  const [position, setPosition] = useState({
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = position;
  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [statusId, setStatusId] = useState("");
  const [journey, setJourney] = useState("");

  const journeyList = useSelector((state) => state.journeyList);
  const { loading, journeys, pendingJourneyCount } = journeyList;
  const journeyUpdate = useSelector((state) => state.journeyUpdate);
  const { loading: updateLoading } = journeyUpdate;

  useEffect(() => {
    dispatch(getJourneyList(keyword));
  }, [dispatch, keyword]);

  const classes = useStyles();

  const updateStatus = () => {
    dispatch(updateJourney(journey, status, statusId)).then(() =>
      dispatch(getJourneyList())
    );
    setShowAlert(false);
  };

  return (
    <>
      {loading ? (
        <Paper sx={{ width: "100%", overflow: "hidden", height: "200px" }}>
          <TableContainer>
            <Table stickyHeader className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Driver Name</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Trip Description</TableCell>
                  <TableCell>Start KM</TableCell>
                  <TableCell>End KM</TableCell>
                  <TableCell>Total Km</TableCell>
                  <TableCell>Actions</TableCell>
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
          <>
            <Snackbar
              open={success}
              autoHideDuration={1000}
              onClose={() => setSuccess(false)}
              anchorOrigin={{ vertical, horizontal }}
            >
              <Notification
                className={classes.notificationItem}
                shadowless
                type={status === "accepted" ? "info" : "delivered"}
                message={`Journey ${status.toUpperCase()}..!!`}
                variant="contained"
                color={status === "accepted" ? "success" : "secondary"}
              />
            </Snackbar>
          </>

          <TableContainer>
            <Table stickyHeader className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Driver Name</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Trip Description</TableCell>
                  <TableCell>Start KM</TableCell>
                  <TableCell>End KM</TableCell>
                  <TableCell>Total Km</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {journeys?.map((j, i) => {
                  if (j.journey.status === "pending") {
                    return (
                      <TableRow key={j._id}>
                        <TableCell className="pl-3 fw-normal">
                          {j.driver.firstName} {j.driver.lastName}
                        </TableCell>
                        <TableCell>
                          {displayDateFormate(j.journey.journeyDate)}{" "}
                          {j.journey.journeyTime}
                        </TableCell>

                        {j.journey.startDestination.length >= 25 ? (
                          <TableCell>
                            {j.journey.startDestination.slice(0, 25)}...
                          </TableCell>
                        ) : (
                          <TableCell>{j.journey.startDestination}</TableCell>
                        )}
                        {/* <TableCell>
                     <p
                       className="ellipsis"
                       data-text={j.journey.startDestination}
                     >
                       {j.journey.startDestination}
                     </p>
                   </TableCell> */}
                        <TableCell>{j.journey.startReading}</TableCell>
                        <TableCell>{j.journey.endReading}</TableCell>
                        <TableCell>
                          {j.journey.endReading - j.journey.startReading}
                        </TableCell>

                        <TableCell>
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                          >
                            <Grid item xs={6}>
                              {" "}
                              {/* <Chip
                                onClick={() => {
                                  setStatus("accepted");
                                  setSuccess(true);
                                  // setJourney(j);
                                  // setStatusId(j._id);
                                  // setShowAlert(true);
                                }}
                                label={<AcceptIcon fontSize="20" />}
                                classes={{
                                  root: classes[states["accepted"]],
                                }}
                              /> */}
                              <IconButton
                                // classes={{
                                //   root: classes[states["accepted"]],
                                // }}
                                className={classes.noPadding}
                                onClick={() => {
                                  setStatus("accepted");
                                  // setSuccess(true);
                                  setJourney(j);
                                  setStatusId(j._id);
                                  setShowAlert(true);
                                }}
                              >
                                <AcceptIcon
                                  classes={{
                                    root: classes[states["accepted"]],
                                  }}
                                />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                              {/* <Chip
                                onClick={() => {
                                  setStatus("rejected");
                                  setSuccess(true);
                                  setStatusId(j._id);
                                  setJourney(j);
                                  setShowAlert(true);
                                }}
                                label={<CloseIcon fontSize="20" />}
                                classes={{
                                  root: classes[states["rejected"]],
                                }}
                              /> */}
                              <IconButton
                                className={classes.noPadding}
                                onClick={() => {
                                  setStatus("rejected");
                                  setSuccess(true);
                                  setStatusId(j._id);
                                  setJourney(j);
                                  setShowAlert(true);
                                }}
                              >
                                <CloseIcon
                                  classes={{
                                    root: classes[states["rejected"]],
                                  }}
                                />
                              </IconButton>
                            </Grid>
                          </Grid>

                          <Dialog
                            onClose={() => setShowAlert(false)}
                            open={showAlert}
                            TransitionComponent={Transition}
                          >
                            <DialogTitle>{`Status will be changed to ${status?.toUpperCase()}..!!`}</DialogTitle>

                            <DialogActions>
                              <Button onClick={updateStatus}>OK</Button>
                              <Button
                                autoFocus
                                onClick={() => setShowAlert(false)}
                              >
                                Cancel
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
};

export default JourneyTable;
