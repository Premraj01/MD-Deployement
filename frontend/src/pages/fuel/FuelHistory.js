import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import moment from "moment";
import PageTitle from "../../components/PageTitle/PageTitle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fs from "file-saver";
import {
  getCarDetails,
  getCarList,
  getCarReading,
} from "../../Actions/carActions";
import useStyles from "../dashboard/styles";
import { CloudDownload as DownloadIcon } from "@material-ui/icons";
import FuelHistoryTable from "./FuelHistoryTable";
import Widget from "../../components/Widget/Widget";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Modal, Stack, TextField } from "@mui/material";
import { dateFormate, displayDateFormate } from "../../Services/DateFormate";
import { Workbook } from "exceljs";

const FuelHistory = () => {
  var classes = useStyles();
  const [selectCar, setSelectCar] = useState("");
  const [carFuel, setCarFuel] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  var [isSearchOpen, setSearchOpen] = useState(true);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const carList = useSelector((state) => state.carList);
  const { cars, loading } = carList;
  const carDetails = useSelector((state) => state.carDetails);
  const { car } = carDetails;
  const carReading = useSelector((state) => state.carReading);
  const { reading } = carReading;

  //   const deleteFuel = useSelector((state) => state.deleteFuel);
  //   const { success: deleteSuccess } = deleteFuel;

  useEffect(() => {
    dispatch(getCarList());
    searchMaintenance();
  }, [dispatch, selectCar, car, endDate, startDate]);

  const exportToCsv = () => {
    let workbook = new Workbook();
    let totalAmount = 0;
    let totalFuel = 0;
    carFuel.map((car) => {
      totalAmount = totalAmount + car.amount;
      totalFuel = totalFuel + car.quantity;
    });
    let title = `${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${"Fuel Maintenance "}`;
    let subTitle = `${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${"Fuel Maintenance for"} ${
      car?.carName
    }-${car?.carNumber}`;
    let headers = ["Date", " ", "Reading", "Amount", "Fuel Qty(liter)"];
    // Convert users data to a csv
    let usersCsv = carFuel?.reduce((acc, car, i) => {
      acc.push([
        `${displayDateFormate(car?.date)}`,
        ` `,
        `${car?.reading}`,
        `${car?.amount}`,
        `${car?.quantity}`,
      ]);
      return acc;
    }, []);
    let workSheet = workbook.addWorksheet("Fuel Data");
    let titleRow = workSheet.addRow([title]);
    titleRow.font = {
      name: "Roboto sans-serif",
      family: 4,
      size: 12,
      bold: true,
    };
    let headerDescription = workSheet.addRow([subTitle]);
    headerDescription.font = {
      name: "Roboto sans-serif",
      family: 4,
      size: 8,
    };
    workSheet.addRow([]);
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
    const dateCol = workSheet.getColumn(1);
    dateCol.width = 15;
    usersCsv.forEach((d) => {
      let row = workSheet.addRow(d);
      let qty = row.getCell(5);
    });
    let footerTotal = [
      " ",
      "Total",
      "",
      `${totalAmount}`,
      `${totalFuel.toFixed(2)}`,
    ];
    let footerStart = [
      " ",
      "",
      "",
      "Start Km",
      `${reading?.readings?.startReading}`,
    ];
    let footerEnd = [" ", "", "", "End Km", `${reading?.readings?.endReading}`];
    let footerTotalReading = [
      " ",
      "",
      "",
      "Total Reading",
      `${reading?.readings?.endReading - reading?.readings?.startReading}`,
    ];

    let footerAvg = [
      " ",
      "",
      "",
      "Average",
      `${(
        (reading?.readings?.endReading - reading?.readings?.startReading) /
        totalFuel
      ).toFixed(2)}`,
    ];
    workSheet.addRow(footerTotal);
    workSheet.addRow([]);
    workSheet.addRow(footerStart);
    workSheet.addRow(footerEnd);
    workSheet.addRow(footerTotalReading);
    workSheet.addRow(footerAvg);
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(
        blob,
        `${car?.carName}-${car?.carNumber}_Maintenance_History.xlsx`,
      );
    });
  };

  const sortFuelByDate = () => {
    carFuel?.sort((a, b) => {
      return moment(b?.date, "DD-MM-YYYY").diff(moment(a?.date, "DD-MM-YYYY"));
    });
  };

  const searchMaintenance = () => {
    if (startDate !== null && endDate !== null) {
      let start = moment(startDate).subtract(1, "days");
      let carArr = [];
      car?.fuelMaintenance.forEach((fuel) => {
        if (dateFormate(start) <= dateFormate(fuel.date)) {
          if (dateFormate(endDate) >= dateFormate(fuel.date)) {
            carArr.push(fuel);
          }
        }
      });

      setCarFuel(carArr);
      sortFuelByDate();
    } else {
      setCarFuel(car?.fuelMaintenance);
      sortFuelByDate();
    }
    dispatch(
      getCarReading(dateFormate(startDate), dateFormate(endDate), car._id),
    );
  };

  return (
    <>
      <PageTitle title="Fuel History" />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid xs={4}></Grid>
        <Grid xs={4}>
          <FormControl
            style={{
              width: "210px",
            }}
            variant="outlined"
            autoWidth
          >
            <InputLabel id="select-label">
              <em>Choose Car</em>
            </InputLabel>
            <Select
              labelId="select-label"
              label="Choose Car"
              onChange={(e) => {
                dispatch(getCarDetails(e.target.value));
              }}
              autoWidth
            >
              <MenuItem value="">
                <em>Choose Car</em>
              </MenuItem>
              {cars.map((c) => {
                return (
                  <MenuItem value={c._id} key={c._id}>
                    {c.carName + "-" + c.carNumber}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={4}></Grid>
        {
          car?.fuelMaintenance?.length > 0 && (
            <Grid
              item
              xs={12}
              style={{
                marginTop: "2%",
              }}
            >
              <Widget
                style={{
                  height: "500px",
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
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
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
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              clearable={true}
                              value={endDate}
                              inputFormat="dd/MM/yyyy"
                              onChange={(newValue) => {
                                setEndDate(newValue);
                                searchMaintenance();
                              }}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </div>
                    </div>

                    <div className={classes.mainChartHeaderLabels}>
                      <div className={classes.mainChartHeaderLabel}>
                        <div>
                          <IconButton
                            onClick={exportToCsv}
                            disabled={endDate ? false : true}
                          >
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
                {carFuel?.length > 0 && (
                  <FuelHistoryTable
                    carFuel={carFuel}
                    loading={loading}
                    car={car}
                  />
                )}
              </Widget>
            </Grid>
          )
          // <FuelHistoryTable car={car} />
        }
      </Grid>
    </>
  );
};

export default FuelHistory;
