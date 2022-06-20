import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import useStyles from "../dashboard/styles";
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { useDispatch, useSelector } from "react-redux";
import { getCarDetails, getCarList } from "../../Actions/carActions";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { AiOutlineFileAdd } from "react-icons/ai";
import {
  CloudDownload as DownloadIcon,
  AddCircle as AddIcon,
} from "@material-ui/icons";
import { Stack, TextField } from "@mui/material";
import moment from "moment";
import { dateFormate } from "../../Services/DateFormate";
import MaintenanceTable from "./MaintenanceTable";
import { Link } from "react-router-dom";

const MaintenanceList = () => {
  var classes = useStyles();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [carMaintenanceTypes, setCarMaintenanceTypes] = useState([]);

  const carList = useSelector((state) => state.carList);
  const { cars, loading } = carList;
  const carDetails = useSelector((state) => state.carDetails);
  const { car } = carDetails;

  useEffect(() => {
    dispatch(getCarList());
    searchMaintenance();
  }, [dispatch, car, startDate, endDate]);

  const searchMaintenance = () => {
    if (startDate !== null && endDate !== null) {
      let carArr = [];
      // let start = moment(startDate).subtract(1, "days");
      let end = moment(endDate).add(1, "days");
      car?.carMaintenance.forEach((fuel) => {
        if (dateFormate(startDate) <= dateFormate(fuel.date)) {
          if (dateFormate(end) >= dateFormate(fuel.date)) {
            carArr.push(fuel);
          }
        }
      });
      setCarMaintenanceTypes(carArr);
    } else {
      setCarMaintenanceTypes(car?.carMaintenance);
    }
  };

  return (
    <>
      <PageTitle title="Maintenance List" />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <FormControl
                style={{
                  width: "210px",
                }}
                variant="outlined"
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
          </Grid>
        </Grid>
        <Grid item xs={4}></Grid>
        {carMaintenanceTypes?.length > 0 ? (
          <>
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
                              }}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </div>
                    </div>

                    <div className={classes.mainChartHeaderLabels}>
                      <div className={classes.mainChartHeaderLabel}>
                        <div>
                          <Link
                            to={`/app/carMaintenance/add/${car._id}`}
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<AddIcon />}
                            >
                              ADD MAINTENANCE
                            </Button>
                          </Link>
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
                <MaintenanceTable
                  maintenanceList={carMaintenanceTypes}
                  car={car}
                  loading={loading}
                />
              </Widget>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "2%",
              }}
            >
              {Object.keys(car).length !== 0 ? (
                <Widget
                  upperTitle
                  noBodyPadding
                  // bodyClass={classes.tableWidget}
                >
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item xs={12}>
                        <AiOutlineFileAdd size={100} />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      style={{
                        paddingBottom: "4px",
                      }}
                    >
                      <Grid item xs={12}>
                        <Typography>
                          {" "}
                          No maintenances! Please add some maintenances{" "}
                          <Link
                            to={`/app/carMaintenance/add/${car._id}`}
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            {" "}
                            <Button variant="text" color="primary">
                              Add Maintenance
                            </Button>{" "}
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Widget>
              ) : (
                <></>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default MaintenanceList;
