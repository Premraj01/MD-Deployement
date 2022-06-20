import React, { useState, useEffect } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Grid,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import {
  CheckCircle as AcceptIcon,
  Cancel as CloseIcon,
} from "@material-ui/icons";
import {
  getExpense,
  updateExpenseDepartment,
} from "../../Actions/expenseActions";
import { useDispatch, useSelector } from "react-redux";
import { displayDateFormate } from "../../Services/DateFormate";
import useStyles from "../dashboard/styles";
import { AppConst } from "../../constants/appConstants";
import { Slide } from "react-toastify";
import { Skeleton } from "@mui/material";

const states = {
  accepted: "success",
  pending: "warning",
  rejected: "secondary",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ExpenseTable = ({ expenses, loading }) => {
  const dispatch = useDispatch();

  var classes = useStyles();

  const [department, setDepartment] = useState("Department");
  const [showModal, setShowModal] = useState(false);
  const [expenseImage, setExpenseImage] = useState("");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Department");
  const [showAlert, setShowAlert] = useState(false);
  const [expense, setExpense] = useState("");
  const [statusId, setStatusId] = useState("");
  const [driver, setDriver] = useState("");
  const [loader, setLoader] = useState(false);

  const updateStatus = () => {
    // dispatch(
    //   updateJourney(
    //     journey,
    //     status,
    //     statusId,
    //   ),
    // );
    setShowAlert(false);
  };

  const updateDepartmentHandler = (e, ex) => {
    // dispatch(updateExpenseDepartment(ex._id, e.target.value)).then(() => {
    //   dispatch(getExpense());
    // });
  };

  const exportToCsv = (e) => {
    let title = [`${" "},${" "},${"Driver Expenses"}`, `${" "}`];

    let headers = ["sr.No,Driver,Department,Date,Expense Type,Expense Amount"];
    let expenseTypes;
    // Convert users data to a csv
    let usersCsv = expenses.reduce((acc, ex, i) => {
      acc.push(
        [
          `${i + 1}`,
          `${ex.driver.firstName} ${ex.driver.lastName}`,
          `${ex.department === "" ? "-" : ex.department}`,
          `${displayDateFormate(ex.date)}`,
          `${ex.expenseType.toString().replace(",", " ")}`, // `${ex.expenseType}`,,
          `${ex.expenseAmount}`,
        ].join(","),
      );
      return acc;
    }, []);
    // downloadFile({
    //   data: [...title, ...headers, ...usersCsv].join("\n"),
    //   fileName: `expense_history.csv`,
    //   fileType: "text/csv",
    // });
    setShowDownloadModal(false);
  };

  return (
    <>
      {loading ? (
        <TableContainer>
          <Table stickyHeader className="mb-0">
            <TableHead>
              <TableRow>
                <TableCell>Driver</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Department</TableCell>
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
                  <TableCell>Driver</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {expenses.map((ex, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        {ex.driver?.firstName} {ex.driver?.lastName}{" "}
                      </TableCell>
                      <TableCell>{displayDateFormate(ex.date)}</TableCell>

                      {ex.expenseType.length > 20 ? (
                        <TableCell>{ex.expenseType.slice(0, 20)}...</TableCell>
                      ) : (
                        <TableCell>{ex.expenseType}</TableCell>
                      )}
                      <TableCell>{ex.expenseAmount}</TableCell>
                      {ex?.department ? (
                        <TableCell>{ex?.department}</TableCell>
                      ) : (
                        <TableCell>
                          <FormControl
                            style={{
                              width: "200px",
                            }}
                            variant="outlined"
                          >
                            <InputLabel id="select-label">
                              <em>Choose Department</em>
                            </InputLabel>
                            <Select
                              labelId="select-label"
                              id={`${ex._id}`}
                              label="Choose Department"
                              onChange={(e) => setDepartment(e.target.value)}
                              autoWidth
                            >
                              {AppConst.DEPARTMENT_LIST.map((d, i) => {
                                return (
                                  <MenuItem value={d} key={i}>
                                    {d}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </TableCell>
                      )}

                      <TableCell>
                        {/**/}
                        {ex.status === "pending" ? (
                          <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                          >
                            <Grid item xs={6}>
                              {" "}
                              <IconButton className={classes.noPadding}>
                                <AcceptIcon
                                  classes={{
                                    root: classes[states["accepted"]],
                                  }}
                                />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton className={classes.noPadding}>
                                <CloseIcon
                                  classes={{
                                    root: classes[states["rejected"]],
                                  }}
                                />
                              </IconButton>
                            </Grid>
                          </Grid>
                        ) : ex.status === "accepted" ? (
                          <IconButton className={classes.noPadding}>
                            <AcceptIcon
                              classes={{
                                root: classes[states["accepted"]],
                              }}
                            />
                          </IconButton>
                        ) : (
                          <IconButton className={classes.noPadding}>
                            <CloseIcon
                              classes={{
                                root: classes[states["rejected"]],
                              }}
                            />
                          </IconButton>
                        )}

                        <Dialog
                          onClose={() => setShowAlert(false)}
                          open={showAlert}
                          TransitionComponent={Transition}
                        >
                          <DialogTitle>{`Status will be changed to ${status?.toUpperCase()}..!!`}</DialogTitle>

                          <DialogActions>
                            <Button onClick={updateStatus}>OK</Button>
                            <Button autoFocus>Cancel</Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
};

export default ExpenseTable;
