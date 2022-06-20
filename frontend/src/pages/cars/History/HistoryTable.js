import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Skeleton } from "@mui/material";
import React from "react";
import {
  CheckCircle as AcceptIcon,
  Cancel as CloseIcon,
} from "@material-ui/icons";
import { Typography } from "../../../components/Wrappers/Wrappers";
import { displayDateFormate } from "../../../Services/DateFormate";
import useStyles from "../../dashboard/styles";

const HistoryTable = ({ journeys, car, loading, carLoading }) => {
  var classes = useStyles();
  return (
    <>
      {loading || carLoading ? (
        <Paper sx={{ width: "100%", overflow: "hidden", height: "200px" }}>
          <TableContainer>
            <Table stickyHeader className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Date </TableCell>
                  <TableCell>Journey Description</TableCell>
                  <TableCell>Start Reading</TableCell>
                  <TableCell>End Reading</TableCell>
                  <TableCell>Total Day Km Running</TableCell>
                  <TableCell> Start Time</TableCell>
                  <TableCell> End Time</TableCell>
                  <TableCell>Total Hours</TableCell>
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
                  <TableCell>Date </TableCell>
                  <TableCell>Journey Description</TableCell>
                  <TableCell>Start Reading</TableCell>
                  <TableCell>End Reading</TableCell>
                  <TableCell>Total Day Km Running</TableCell>
                  <TableCell> Start Time</TableCell>
                  <TableCell> End Time</TableCell>
                  <TableCell>Total Hours</TableCell>
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
                        <TableCell>
                          {j.journey.startDestination.replace(",", " ")}
                        </TableCell>
                        <TableCell>{j.journey.startReading}</TableCell>
                        <TableCell>{j.journey.endReading}</TableCell>
                        <TableCell>
                          {j.journey.endReading - j.journey.startReading}
                        </TableCell>

                        <TableCell>10</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>10</TableCell>
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
