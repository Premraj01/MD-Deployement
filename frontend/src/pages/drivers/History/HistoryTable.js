import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Table,
  TableBody,
} from "@material-ui/core";
import {
  CheckCircle as AcceptIcon,
  Cancel as CloseIcon,
} from "@material-ui/icons";
import useStyles from "../../dashboard/styles";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { displayDateFormate } from "../../../Services/DateFormate";

const HistoryTable = ({ journeys, driver, loading, driverLoading }) => {
  var classes = useStyles();
  return (
    <>
      {loading || driverLoading ? (
        <Paper sx={{ width: "100%", overflow: "hidden", height: "200px" }}>
          <TableContainer>
            <Table stickyHeader className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Trip Description</TableCell>
                  <TableCell>Start Km</TableCell>
                  <TableCell>End Km</TableCell>
                  <TableCell>Total Km</TableCell>
                  <TableCell>Car</TableCell>
                  <TableCell>Status</TableCell>
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
          <TableContainer>
            <Table stickyHeader className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Trip Description</TableCell>
                  <TableCell>Start Km</TableCell>
                  <TableCell>End Km</TableCell>
                  <TableCell>Total Km</TableCell>
                  <TableCell>Car</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {journeys?.map((j, i) => {
                  if (j.journey.status !== "pending") {
                    return (
                      <TableRow key={j._id}>
                        <TableCell>
                          {displayDateFormate(j.journey.journeyDate)}
                        </TableCell>
                        <TableCell>{j.journey.startDestination}</TableCell>
                        <TableCell>{j.journey.startReading}</TableCell>
                        <TableCell>{j.journey.endReading}</TableCell>
                        <TableCell>
                          {j.journey.endReading - j.journey.startReading}
                        </TableCell>
                        <TableCell>
                          {j.car.carName} - {j.car.carNumber}
                        </TableCell>

                        {j.journey.status === "accepted" ? (
                          <TableCell>
                            <AcceptIcon className={classes.successIcon} />
                          </TableCell>
                        ) : (
                          <TableCell>
                            <CloseIcon className={classes.secondaryIcon} />
                          </TableCell>
                        )}
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

export default HistoryTable;
