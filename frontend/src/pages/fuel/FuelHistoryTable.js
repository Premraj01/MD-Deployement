import React, { useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Slide,
} from "@material-ui/core";
import {
  RemoveRedEyeRounded as ViewIcon,
  DeleteForever as DeleteIcon,
  Cancel as CloseIcon,
} from "@material-ui/icons";
import useStyles from "../dashboard/styles";
import { displayDateFormate } from "../../Services/DateFormate";
import { Skeleton, Modal, Box } from "@mui/material";
import { Typography } from "../../components/Wrappers/Wrappers";
import { deleteFuelWithId } from "../../Actions/carActions";
import { useDispatch } from "react-redux";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FuelHistoryTable = ({ carFuel, loading, car }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [fuelDeleteCarId, setFuelDeleteCarId] = useState("");

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [fuelDeleteId, setFuelDeleteId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [fuelModal, setFuelModal] = useState({});

  const deleteFuelHandler = (fuelDeleteCarId, fuelDeleteId) => {
    dispatch(deleteFuelWithId(fuelDeleteCarId, fuelDeleteId));
    window.location.reload();
  };
  return (
    <>
      {loading ? (
        <TableContainer>
          <Table stickyHeader className="mb-0">
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Reading(in KM)</TableCell>
                <TableCell>Quantity(in Litre)</TableCell>
                <TableCell>Remark</TableCell>
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
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden", height: "200px" }}>
          <TableContainer>
            <Table stickyHeader className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Reading(in KM)</TableCell>
                  <TableCell>Quantity(in Litre)</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {carFuel.map((m, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{m.amount}</TableCell>
                      <TableCell>{displayDateFormate(m.date)}</TableCell>
                      <TableCell>{m.reading}</TableCell>
                      <TableCell>{m.quantity}</TableCell>

                      <TableCell>
                        {" "}
                        <div className={classes.mainChartHeader}>
                          <div className={classes.mainChartHeaderLabels}>
                            <div>
                              <IconButton
                                className={classes.noPadding}
                                onClick={() => {
                                  setShowModal(true);
                                  setFuelModal(m);
                                }}
                              >
                                <ViewIcon />
                              </IconButton>
                            </div>
                            <div>
                              <IconButton
                                color="secondary"
                                className={classes.noPadding}
                                onClick={() => {
                                  setShowDeleteAlert(true);
                                  setFuelDeleteId(m._id);
                                  setFuelDeleteCarId(car._id);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
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
        </Paper>
      )}
      <Modal open={showModal}>
        <Box sx={style}>
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
          <Grid container spacing={1} style={{ padding: "10px" }}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid>
                <Typography>Fuel Receipt </Typography>
                <img
                  alt=""
                  style={{ height: "200px", width: "200px" }}
                  src={`${fuelModal.fuelReceiptImage}`}
                />
              </Grid>
              <Grid>
                <Typography>Fuel Receipt Copy</Typography>
                <img
                  alt=""
                  style={{ height: "200px", width: "200px" }}
                  src={`${fuelModal.fuelBillReceiptCopyImage}`}
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
                <Typography>Odometer Reading</Typography>
                <img
                  alt=""
                  style={{ height: "200px", width: "200px" }}
                  src={`${fuelModal.odometerImage}`}
                />
              </Grid>
              <Grid></Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Dialog
        onClose={() => setShowDeleteAlert(false)}
        open={showDeleteAlert}
        TransitionComponent={Transition}
      >
        <DialogTitle>{`Fuel history will be deleted..!!`}</DialogTitle>

        <DialogActions>
          <Button
            onClick={() => deleteFuelHandler(fuelDeleteCarId, fuelDeleteId)}
          >
            OK
          </Button>
          <Button autoFocus onClick={() => setShowDeleteAlert(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FuelHistoryTable;
