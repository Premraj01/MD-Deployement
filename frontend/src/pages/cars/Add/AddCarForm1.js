import { Button, Grid } from "@material-ui/core";
import {
  Avatar,
  Badge,
  Box,
  InputAdornment,
  Modal,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, LocalizationProvider, LoadingButton } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React, { useEffect, useState } from "react";
import CarFormSteps from "../../../components/CarForm/CarFormSteps";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { saveStep1Details } from "../../../Actions/carActions";
import { FaCar as CarIcon } from "react-icons/fa";
import { AiOutlineFieldNumber as NumberIcon } from "react-icons/ai";
import {
  PermContactCalendar as ContactIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  Assignment as LicenseIcon,
  CameraFront as ImageIcon,
  NavigateNext as NextIcon,
  Cancel as CloseIcon,
} from "@material-ui/icons";
import { AppConst } from "../../../constants/appConstants";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Typography } from "../../../components/Wrappers/Wrappers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const AddCarForm1 = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [carName, setCarName] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carImage, setCarImage] = useState("");
  const [carImageUploading, setCarImageUploading] = useState("");
  const [imageModal, setImageModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const [carFitnessStartDate, setCarFitnessStartDate] = useState(null);
  const [carFitnessEndDate, setCarFitnessEndDate] = useState(null);
  const [carFitnessImage, setCarFitnessImage] = useState("");
  const [carFitnessImageUploading, setCarFitnessImageUploading] = useState("");

  const [carPurchaseInvoice, setCarPurchaseInvoice] = useState("");
  const [carPurchaseInvoiceDate, setCarPurchaseInvoiceDate] = useState(null);
  const [
    carPurchaseInvoiceUploading,
    setCarPurchaseInvoiceUploading,
  ] = useState("");

  const carForm = useSelector((state) => state.carForm);
  const { formDetails } = carForm;

  useEffect(() => {
    let step1Exist = JSON.parse(localStorage.getItem("step1Details"));
    if (step1Exist) {
      setCarName(step1Exist.carName);
      setCarNumber(step1Exist.carNumber);
      setCarImage(step1Exist.carImage);
      setCarFitnessStartDate(step1Exist.carFitnessStartDate);
      setCarFitnessEndDate(step1Exist.carFitnessEndDate);
      setCarFitnessImage(step1Exist.carFitnessEndDate);
      setCarPurchaseInvoice(step1Exist.carPurchaseInvoice);
      setCarPurchaseInvoiceDate(step1Exist.setCarPurchaseInvoiceDate);
    }
  }, []);

  const step1FormHandler = () => {
    dispatch(
      saveStep1Details({
        carName,
        carNumber,
        carImage,
        carFitnessStartDate,
        carFitnessEndDate,
        carFitnessImage,
        carPurchaseInvoice,
        carPurchaseInvoiceDate,
      }),
    );
    history.push("/app/cars/add/step2");
  };
  const hasNumber = (str) => {
    return /\d/.test(str);
  };

  return (
    <>
      <PageTitle title="Car Form" />
      <Stack>
        {/* <Snackbar
          open={success}
          autoHideDuration={1000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Notification
            className={classes.notificationItem}
            shadowless
            type={success ? "info" : "delivered"}
            message={`${message}`}
            variant="contained"
            color={success ? "success" : "secondary"}
          />
        </Snackbar> */}
      </Stack>
      <Paper>
        <CarFormSteps step1 />

        <form
          style={{
            paddingTop: "4%",
            paddingLeft: "4%",
            paddingRight: "4%",
          }}
          onSubmit={step1FormHandler}
        >
          <Grid
            container
            alignItems="center"
            justify="space-between"
            direction="row"
            spacing={4}
          >
            <Grid item xs={4}>
              <Stack>
                <TextField
                  id="car-name"
                  name="carName"
                  label="Car Name"
                  type="text"
                  value={carName}
                  helperText={
                    carName
                      ? !hasNumber(carName)
                        ? ""
                        : "Only Numbers are allowed"
                      : ""
                  }
                  error={carName ? (!hasNumber(carName) ? false : true) : false}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CarIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setCarName(e.target.value);
                  }}
                  required
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <TextField
                  id="car-number"
                  name="carNumber"
                  label="Car Number"
                  type="text"
                  value={carNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <NumberIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setCarNumber(e.target.value);
                  }}
                  required
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              {carImage ? (
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  badgeContent={
                    <CloseIcon
                      onClick={() => setCarImage("")}
                      style={{
                        fontSize: "18px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  }
                >
                  <Avatar
                    alt="Remy Sharp"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setImageModal(true);
                      setModalImage(carImage);
                    }}
                    src={`${carImage}`}
                    sx={{ boxShadow: 4 }}
                  />
                </Badge>
              ) : !carImageUploading ? (
                <Stack>
                  <TextField
                    id="car-image"
                    name="carImage"
                    label="Car Image"
                    accept="image/*"
                    type="file"
                    disabled={
                      carName.length > 0 && carNumber.length > 0 ? false : true
                    }
                    helperText={
                      carName.length > 0 && carNumber.length > 0
                        ? ""
                        : "Please Enter Car Name and Number"
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImageIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={async (e) => {
                      const file = e.target.files[0];

                      var blob = file.slice(0, file.size, file.type);
                      var newFile = new File(
                        [blob],
                        `${carName}_${carNumber}_image`,
                        {
                          type: file.type,
                        },
                      );
                      const formData = new FormData();
                      formData.append("image", newFile);
                      setCarImageUploading(true);
                      try {
                        const config = {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        };
                        const { data } = await axios.post(
                          `${AppConst.BASE_URL}/api/upload/car/profile/${carNumber}`,
                          formData,
                          config,
                        );
                        setCarImage(data);

                        setCarImageUploading(false);
                      } catch (error) {
                        setCarImageUploading(false);
                      }
                    }}
                  />
                </Stack>
              ) : (
                <Stack direction="row" spacing={2}>
                  <LoadingButton
                    loading
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    style={{
                      color: "green",
                    }}
                  >
                    Uploading...
                  </LoadingButton>
                </Stack>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            justify="space-between"
            direction="row"
            spacing={4}
          >
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack>
                  <DatePicker
                    label="Fitness Start Date"
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="dd/MM/yyyy"
                    clearable={true}
                    value={carFitnessStartDate}
                    onChange={(newValue) => {
                      setCarFitnessStartDate(newValue);
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack>
                  <DatePicker
                    label="Fitness End Date"
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="dd/MM/yyyy"
                    clearable={true}
                    minDate={carFitnessStartDate}
                    value={carFitnessEndDate}
                    onChange={(newValue) => {
                      setCarFitnessEndDate(newValue);
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              {carFitnessImage ? (
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  badgeContent={
                    <CloseIcon
                      onClick={() => setCarFitnessImage("")}
                      style={{
                        fontSize: "18px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  }
                >
                  <Avatar
                    alt="Remy Sharp"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setImageModal(true);
                      setModalImage(carFitnessImage);
                    }}
                    src={`${carFitnessImage}`}
                    sx={{ boxShadow: 4 }}
                  />
                </Badge>
              ) : !carFitnessImageUploading ? (
                <Stack>
                  <TextField
                    id="fitness-image"
                    name="fitness"
                    label="Fitness Image"
                    accept="image/*"
                    type="file"
                    disabled={
                      carName.length > 0 && carNumber.length > 0 ? false : true
                    }
                    helperText={
                      carName.length > 0 && carNumber.length > 0
                        ? ""
                        : "Please Enter Car Name and Number"
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImageIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={async (e) => {
                      const file = e.target.files[0];

                      var blob = file.slice(0, file.size, file.type);
                      var newFile = new File(
                        [blob],
                        `${carName}_${carNumber}_Fitness`,
                        {
                          type: file.type,
                        },
                      );
                      const formData = new FormData();
                      formData.append("image", newFile);
                      setCarFitnessImageUploading(true);
                      try {
                        const config = {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        };
                        const { data } = await axios.post(
                          `${AppConst.BASE_URL}/api/upload/car/profile/${carNumber}`,
                          formData,
                          config,
                        );
                        setCarFitnessImage(data);

                        setCarFitnessImageUploading(false);
                      } catch (error) {
                        setCarFitnessImageUploading(false);
                      }
                    }}
                  />
                </Stack>
              ) : (
                <Stack direction="row" spacing={2}>
                  <LoadingButton
                    loading
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    style={{
                      color: "green",
                    }}
                  >
                    Uploading...
                  </LoadingButton>
                </Stack>
              )}
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            direction="row"
            spacing={4}
          >
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack>
                  <DatePicker
                    label="Purchase Date"
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="dd/MM/yyyy"
                    value={carPurchaseInvoiceDate}
                    onChange={(newValue) => {
                      setCarPurchaseInvoiceDate(newValue);
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>

            <Grid item xs={4}>
              {carPurchaseInvoice ? (
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  badgeContent={
                    <CloseIcon
                      onClick={() => setCarPurchaseInvoice("")}
                      style={{
                        fontSize: "18px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  }
                >
                  <Avatar
                    alt="Remy Sharp"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setImageModal(true);
                      setModalImage(carPurchaseInvoice);
                    }}
                    src={`${carPurchaseInvoice}`}
                    sx={{ boxShadow: 4 }}
                  />
                </Badge>
              ) : !carPurchaseInvoiceUploading ? (
                <Stack>
                  <TextField
                    id="Purchase-image"
                    name="Purchase"
                    label="Purchase Invoice Image"
                    accept="image/*"
                    type="file"
                    disabled={
                      carName.length > 0 && carNumber.length > 0 ? false : true
                    }
                    helperText={
                      carName.length > 0 && carNumber.length > 0
                        ? ""
                        : "Please Enter Car Name and Number"
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImageIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={async (e) => {
                      const file = e.target.files[0];

                      var blob = file.slice(0, file.size, file.type);
                      var newFile = new File(
                        [blob],
                        `${carName}_${carNumber}_Purchase`,
                        {
                          type: file.type,
                        },
                      );
                      const formData = new FormData();
                      formData.append("image", newFile);
                      setCarPurchaseInvoiceUploading(true);
                      try {
                        const config = {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        };
                        const { data } = await axios.post(
                          `${AppConst.BASE_URL}/api/upload/car/profile/${carNumber}`,
                          formData,
                          config,
                        );
                        setCarPurchaseInvoice(data);

                        setCarPurchaseInvoiceUploading(false);
                      } catch (error) {
                        setCarPurchaseInvoiceUploading(false);
                      }
                    }}
                  />
                </Stack>
              ) : (
                <Stack direction="row" spacing={2}>
                  <LoadingButton
                    loading
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    style={{
                      color: "green",
                    }}
                  >
                    Uploading...
                  </LoadingButton>
                </Stack>
              )}
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ padding: "2%" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<NextIcon />}
            >
              Next
            </Button>
          </Grid>
        </form>
        <Modal
          open={imageModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={11}></Grid>
              <Grid item xs={1}>
                <Typography
                  style={{
                    margin: "6px",
                    fontWidth: "bold",
                  }}
                >
                  <CloseIcon
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => setImageModal(false)}
                  />
                </Typography>
              </Grid>
            </Grid>
            <img
              alt=""
              style={{ height: "100%", width: "100%" }}
              src={`${modalImage}`}
            />
          </Box>
        </Modal>
      </Paper>
    </>
  );
};

export default AddCarForm1;
