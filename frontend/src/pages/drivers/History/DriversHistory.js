import { Grid, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useStyles from "../../dashboard/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CloudDownload as DownloadIcon } from "@material-ui/icons";
import moment from "moment";
import { Workbook } from "exceljs";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import fs from "file-saver";
import { getDriverDetails } from "../../../Actions/driverActions";
import { getJourneyDetails } from "../../../Actions/journeyActions";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
import HistoryTable from "./HistoryTable";
import { dateFormate, displayDateFormate } from "../../../Services/DateFormate";
import { LocalizationProvider } from "@mui/lab";

const DriversHistory = () => {
  const { id } = useParams();

  var classes = useStyles();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [keyword, setKeyword] = useState("");
  var [isSearchOpen, setSearchOpen] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const journeyDetails = useSelector((state) => state.journeyDetails);
  const { loading, journeys } = journeyDetails;

  const driverDetails = useSelector((state) => state.driverDetails);
  const { loading: driverLoading, driver } = driverDetails;

  useState(() => {
    dispatch(getJourneyDetails(id));
    dispatch(getDriverDetails(id));
  }, [journeys, id]);

  const exportToCsv = (e) => {
    e.preventDefault();

    let workbook = new Workbook();

    let title = `${" "} ${" "} ${" "} ${" "}${" "} ${" "} ${" "} ${" "} ${" "}${" "} ${" "} ${" "} ${" "} ${" "}${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${"Trip History of"} ${
      driver.firstName
    } ${driver.lastName}`;

    // Headers for each column
    let reading = `${" "} ${" "} ${" "} ${" "}
		    Monthly reading:${driver.monthlyTripReading}
			${" "}`;

    let headers = [
      "Driver",
      "Date",
      "Description",
      "Trip KM",
      " Car",
      "Status",
    ];

    // Convert users data to a csv
    let journey;
    let usersCsv = journeys.reduce((acc, journey) => {
      const {
        journeyDate,
        startDestination,

        startReading,
        endReading,
        status,
      } = journey.journey;

      const { carName } = journey.car;
      const { firstName, lastName } = journey.driver;
      let dest = startDestination.replace(/s+/g, "").trim();
      if (status !== "pending") {
        acc.push([
          `${firstName} ${lastName}`,
          `${displayDateFormate(journeyDate)}`,
          `${dest.replace(/,/g, "").trim()}`,
          `${endReading - startReading}`,
          carName,
          status,
        ]);
      }
      return acc;
    }, []);

    let workSheet = workbook.addWorksheet("DriverHistory Data");

    let titleRow = workSheet.addRow([title]);
    titleRow.font = {
      name: "Roboto sans-serif",
      family: 4,
      size: 12,
      bold: true,
    };
    let monthlyR = workSheet.addRow([reading]);
    monthlyR.font = {
      name: "Roboto sans-serif",
      family: 4,
      size: 10,
    };

    workSheet.addRow([]);

    const driverCol = workSheet.getColumn(1);
    const dateCol = workSheet.getColumn(2);
    const tripCol = workSheet.getColumn(3);
    const carCol = workSheet.getColumn(5);

    driverCol.width = 20;
    dateCol.width = 15;
    tripCol.width = 40;
    carCol.width = 20;

    let headerRow = workSheet.addRow(headers);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    usersCsv.forEach((d) => {
      workSheet.addRow(d);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(
        blob,
        `${journeys[0]?.driver.firstName} ${journeys[0]?.driver.lastName}_Trips.xlsx`,
      );
    });

    setShowModal(false);
  };

  return (
    <>
      <PageTitle title={`${driver.firstName} ${driver.lastName}'s History`} />
      <Grid item xs={12}>
        <Widget
          style={{
            height: "800px",
          }}
          header={
            <div className={classes.mainChartHeader}>
              <div className={classes.mainChartHeaderLabels}>
                <div className={classes.mainChartHeaderLabel}>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={4} sx={{ width: "180px" }}>
                        <DatePicker
                          label="Start Date"
                          renderInput={(params) => <TextField {...params} />}
                          inputFormat="dd/MM/yyyy"
                          clearable={true}
                          value={startDate}
                          onChange={(newValue) => {
                            setStartDate(newValue);
                          }}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className={classes.mainChartHeaderLabel}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={4} sx={{ width: "180px" }}>
                      <DatePicker
                        label="End Date"
                        minDate={startDate}
                        renderInput={(params) => <TextField {...params} />}
                        clearable={true}
                        value={endDate}
                        inputFormat="dd/MM/yyyy"
                        onChange={(newValue) => {
                          setEndDate(newValue);
                          dispatch(
                            getJourneyDetails(
                              id,
                              "",
                              dateFormate(startDate),
                              dateFormate(moment(newValue).add(1, "days")),
                            ),
                          );
                        }}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
              </div>

              <div className={classes.mainChartHeaderLabels}>
                <div className={classes.mainChartHeaderLabel}>
                  <div>
                    <IconButton onClick={exportToCsv}>
                      <DownloadIcon />
                    </IconButton>
                  </div>
                </div>
                <div className={classes.mainChartHeaderLabel}>
                  <></>
                </div>
              </div>
            </div>
          }
          upperTitle
          noBodyPadding
          // bodyClass={classes.tableWidget}
        >
          <HistoryTable
            journeys={journeys}
            driver={driver}
            loading={loading}
            driverLoading={driverLoading}
          />
        </Widget>
      </Grid>
    </>
  );
};

export default DriversHistory;
