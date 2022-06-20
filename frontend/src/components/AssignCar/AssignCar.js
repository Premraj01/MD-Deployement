import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { getCarDetails, updateCar } from "../../Actions/carActions";
import { updateDriver } from "../../Actions/driverActions";
import { Typography } from "../Wrappers/Wrappers";
import { DialogActions, Slide, Dialog, DialogTitle } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssignCar = ({ driver, car, cars }) => {
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);
  const [carId, setCarId] = useState("");
  const [previousCarId, setPreviousCarId] = useState("");

  const carUpdate = useSelector((state) => state.carUpdate);
  const {
    loading: carUpdateLoading,
    error: carUpdateError,
    success: carUpdateSuccess,
  } = carUpdate;

  const carDetails = useSelector((state) => state.carDetails);
  const {
    loading: carDetailsLoading,
    error: carDetailsError,
    car: dischargeCarStatus,
  } = carDetails;

  useEffect(() => {
    // cars?.map((car) => {
    //   if (car.carStatus === true) {
    //     window.location.reload();
    //   }
    // });
  }, []);

  const dischargeCar = async (e) => {
    if (driver.carId !== null) {
      setPreviousCarId(car._id);

      dispatch(getCarDetails(previousCarId));
    }

    dispatch(
      updateCar({
        _id: dischargeCarStatus._id,
        carName: dischargeCarStatus.carName,
        RCNumber: dischargeCarStatus.RCNumber,
        PUCNumber: dischargeCarStatus.PUCNumber,
        carNumber: dischargeCarStatus.carNumber,
        insuranceNumber: dischargeCarStatus.insuranceNumber,

        carImage: dischargeCarStatus.carImage,

        RCBookImage: dischargeCarStatus.RCBookImage,

        PUCImage: dischargeCarStatus.PUCImage,
        PUCStartDate: dischargeCarStatus.PUCStartDate,
        PUCEndDate: dischargeCarStatus.PUCEndDate,

        insuranceImage: dischargeCarStatus.insuranceImage,
        insuranceStartDate: dischargeCarStatus.insuranceStartDate,
        insuranceEndDate: dischargeCarStatus.insuranceEndDate,
        carFitnessImage: dischargeCarStatus.carFitnessImage,
        carFitnessStartDate: dischargeCarStatus.carFitnessStartDate,
        carFitnessEndDate: dischargeCarStatus.carFitnessEndDate,
        carRCTCNo: dischargeCarStatus.carRCTCNo,
        carRCTCImage: dischargeCarStatus.carRCTCImage,
        carPurchaseInvoice: dischargeCarStatus.carPurchaseInvoice,
        carPurchaseInvoiceDate: dischargeCarStatus.carPurchaseInvoiceDate,

        carStatus: false,
      }),
    );

    dispatch(
      updateDriver({
        _id: driver._id,
        firstName: driver.firstName,
        lastName: driver.lastName,
        mobileNumber: driver.mobileNumber,
        password: driver.password,
        gender: driver.gender,
        licence: driver.licence,
        image: driver.photo,
        licenceImage: driver.licenceImage,
        carAssignedDate: driver.carAssignedDate,
        designation: driver.designation,
        birthDate: driver.birthDate,

        carId: carId,
        status: driver.status,
      }),
    );
    window.location.reload();
  };

  const removeCar = (driver, car) => {
    dispatch(
      updateDriver({
        _id: driver._id,
        firstName: driver.firstName,
        lastName: driver.lastName,
        mobileNumber: driver.mobileNumber,
        password: driver.password,
        gender: driver.gender,
        licence: driver.licence,
        image: driver.photo,
        licenceImage: driver.licenceImage,
        carAssignedDate: driver.carAssignedDate,
        designation: driver.designation,
        birthDate: driver.birthDate,

        carId: null,
        status: driver.status,
      }),
    );
    dispatch(
      updateCar({
        _id: car._id,
        carName: car.carName,
        carNumber: car.carNumber,
        carImage: car.carImage,
        RCNumber: car.RCNumber,
        RCBookImage: car.RCBookImage,
        PUCNumber: car.PUCNumber,
        PUCImage: car.PUCImage,
        PUCStartDate: car.PUCStartDate,
        PUCEndDate: car.PUCEndDate,
        insuranceNumber: car.insuranceNumber,
        insuranceImage: car.insuranceImage,
        insuranceStartDate: car.insuranceStartDate,
        insuranceEndDate: car.insuranceEndDate,
        carFitnessImage: car.carFitnessImage,
        carFitnessStartDate: car.carFitnessStartDate,
        carFitnessEndDate: car.carFitnessEndDate,
        carRCTCNo: car.carRCTCNo,
        carRCTCImage: car.carRCTCImage,
        carPurchaseInvoice: car.carPurchaseInvoice,
        carPurchaseInvoiceDate: car.carPurchaseInvoiceDate,
        carStatus: false,
      }),
    );
    window.location.reload();
  };

  return (
    <form
      style={{
        paddingLeft: "4%",
        paddingRight: "4%",
        paddingTop: "2%",
        paddingBottom: "2%",
      }}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6}>
          <Typography variant="h6">
            Assigned Car:{car.carName}-{car.carNumber}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Stack>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="select-label">
                <em>Assign Car</em>
              </InputLabel>
              <Select
                labelId="select-label"
                label="Choose Car"
                value={carId}
                onChange={(e) => {
                  setCarId(e.target.value);
                }}
                autoWidth
              >
                <MenuItem value="">
                  <em>Choose Car</em>
                </MenuItem>

                {cars?.map((c) => {
                  if (c.carStatus === false) {
                    return (
                      <MenuItem value={c} key={c._id}>
                        {c.carName + "-" + c.carNumber}
                      </MenuItem>
                    );
                  } else {
                    return "";
                  }
                })}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Stack>
            <Button
              variant="contained"
              className="rounded"
              onClick={dischargeCar}
              disabled={!carId}
            >
              Update Car
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Button
            startIcon={<DeleteIcon />}
            onClick={() => setShowAlert(true)}
            variant="outlined"
            color="error"
            disabled={car._id ? false : true}
          >
            Remove Car
          </Button>
        </Grid>
      </Grid>

      <Dialog
        onClose={() => setShowAlert(false)}
        open={showAlert}
        TransitionComponent={Transition}
      >
        <DialogTitle>{`Car will be removed for the Driver..!!`}</DialogTitle>

        <DialogActions>
          <Button onClick={() => removeCar(driver, car)}>OK</Button>
          <Button autoFocus onClick={() => setShowAlert(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default AssignCar;
