import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Workbook } from "exceljs";
import useStyles from "../../dashboard/styles";
import fs from "file-saver";
import { getCarDetails } from "../../../Actions/carActions";
import { getJourneyDetails } from "../../../Actions/journeyActions";
import { dateFormate, displayDateFormate } from "../../../Services/DateFormate";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Grid, IconButton } from "@material-ui/core";
import Widget from "../../../components/Widget/Widget";
import { CloudDownload as DownloadIcon } from "@material-ui/icons";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Stack, TextField } from "@mui/material";
import moment from "moment";
import HistoryTable from "./HistoryTable";

const CarsHistory = () => {
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

  const carDetails = useSelector((state) => state.carDetails);
  const { loading: carLoading, car } = carDetails;

  useState(() => {
    dispatch(getJourneyDetails(id));
    dispatch(getCarDetails(id));
  }, [journeys, id]);

  const exportToCsv = (e) => {
    e.preventDefault();
    let workbook = new Workbook();
    let title = `${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "}   ${"Movement of Vehicle"} ${
      journeys[0]?.car.carName
    }-${journeys[0]?.car.carNumber}`;

    // `${" "},${" "},${"Agrawwaal Telecomm Services Kasba Peth Pune-411011"} `,

    // Headers for each column
    let headers = [
      "sr.No",
      "Date",
      "Journey Description",
      "Start ODM Reading(KM)",
      "End ODM Reading(KM)",
      "Total Day Km Running(KM)",
      "Start Time",
      "End Time",
      "Total Hours",
      "Officer Signature",
    ];

    // Convert users data to a csv
    let usersCsv = journeys.reduce((acc, journey, i) => {
      const {
        journeyDate,
        startReading,
        endReading,
        status,
        startDestination,
      } = journey.journey;

      if (status !== "pending" && status !== "rejected") {
        acc.push([
          `${i + 1}`,
          `${displayDateFormate(journeyDate)}`,
          `${startDestination.replace(/,/g, " ").trim()}`,
          `${startReading}`,
          `${endReading}`,
          `${endReading - startReading}`,
          10,
          8,
          10,
        ]);
      }
      return acc;
    }, []);

    let totalKM = journeys.reduce(
      (acc, j) => acc + (j.journey.endReading - j.journey.startReading),
      0,
    );

    // let reading = [
    // 	`${" "}`,
    // 	`${" "}`,
    // 	`${" "}`,
    // 	`${" "}`,
    // 	`${"Total Running:"} ${totalReading}`,
    // ];

    let workSheet = workbook.addWorksheet("CarHistory Data");

    let titleRow = workSheet.addRow([title]);
    titleRow.font = {
      name: "Roboto sans-serif",
      family: 4,
      size: 12,
      bold: true,
    };

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
    workSheet.addRow([]);

    workSheet.addRow(["", "", "", "", "Total KM", `${totalKM}`]);

    workSheet.mergeCells("A4:B5");
    const dateCol = workSheet.getColumn(2);
    const tripCol = workSheet.getColumn(3);

    dateCol.width = 15;
    tripCol.width = 40;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(
        blob,
        `${journeys[0]?.car.carName}-${journeys[0]?.car.carNumber}_Trips.xlsx`,
      );
    });
  };

  return (
    <>
      <PageTitle title={`${car.carName}-${car.carNumber}'s History`} />
      <Grid item xs={12}>
        <Widget
          style={{
            height: "800px",
          }}
          header={
            <>
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
                                // dateFormate(moment(newValue).add(2, "days")),
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
            </>
          }
          upperTitle
          noBodyPadding
          // bodyClass={classes.tableWidget}
        >
          <HistoryTable
            journeys={journeys}
            car={car}
            loading={loading}
            carLoading={carLoading}
          />
        </Widget>
      </Grid>
    </>
  );
};

export default CarsHistory;
