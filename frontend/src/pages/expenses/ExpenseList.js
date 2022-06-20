import React, { useEffect, useState } from "react";
import fs from "file-saver";
import moment from "moment";
import { Search as SearchIcon } from "@material-ui/icons";
import useStyles from "../dashboard/styles";
import classNames from "classnames";
import { Workbook } from "exceljs";
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { Grid, IconButton, InputBase } from "@material-ui/core";
import ExpenseTable from "./ExpenseTable";
import { Stack, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CloudDownload as DownloadIcon } from "@material-ui/icons";
import { dateFormate, displayDateFormate } from "../../Services/DateFormate";
import { useDispatch, useSelector } from "react-redux";
import { getExpense } from "../../Actions/expenseActions";

const ExpenseList = () => {
  var classes = useStyles();
  const dispatch = useDispatch();

  var [isSearchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const expenseList = useSelector((state) => state.expenseList);
  const { loading, expenses } = expenseList;

  const updateDepartment = useSelector((state) => state.updateDepartment);
  const { success } = updateDepartment;

  useEffect(() => {
    dispatch(getExpense(keyword));
  }, [dispatch, keyword]);

  const exportToCsv = () => {
    let workbook = new Workbook();
    let title = `${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "} ${" "}${" "} ${" "} ${" "} ${" "} ${"Driver Expenses"}${" "}`;

    let headers = [
      "Driver",
      "Date",
      "Expense Type",
      "Department",
      "Expense Amount",
    ];

    let usersCsv = expenses?.reduce((acc, ex, i) => {
      if (ex.status === "accepted") {
        acc.push([
          `${ex.driver.firstName} ${ex.driver.lastName}`,
          `${displayDateFormate(ex.date)}`,
          `${ex.expenseType.toString().replace(",", " ")}`, // `${ex.expenseType}`,,
          `${ex.department === "" ? "-" : ex.department}`,
          `${ex.expenseAmount}`,
        ]);
      }
      return acc;
    }, []);

    let workSheet = workbook.addWorksheet("Expense Data");

    let titleRow = workSheet.addRow([title]);
    titleRow.font = {
      name: "Roboto sans-serif",
      family: 4,
      size: 12,
      bold: true,
    };

    workSheet.addRow([]);

    const driverCol = workSheet.getColumn(1);
    const dateCol = workSheet.getColumn(2);
    const tripCol = workSheet.getColumn(3);
    const departmentCol = workSheet.getColumn(4);

    driverCol.width = 20;
    dateCol.width = 15;
    tripCol.width = 30;
    departmentCol.width = 30;

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
      let row = workSheet.addRow(d);
      let qty = row.getCell(5);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(blob, `Expense_List.xlsx`);
    });
  };

  return (
    <>
      <PageTitle title="Expenses List" />
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
                            getExpense(
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
                  <div
                    className={classNames(classes.search, {
                      [classes.searchFocused]: isSearchOpen,
                    })}
                  >
                    <div
                      className={classNames(classes.searchIcon, {
                        [classes.searchIconOpened]: isSearchOpen,
                      })}
                      onClick={() => setSearchOpen(!isSearchOpen)}
                    >
                      <SearchIcon classes={{ root: classes.headerIcon }} />
                    </div>
                    <InputBase
                      placeholder="Search by Driver…"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                    />
                  </div>
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
          <ExpenseTable expenses={expenses} loading={loading} />
        </Widget>
      </Grid>
    </>
  );
};

export default ExpenseList;
