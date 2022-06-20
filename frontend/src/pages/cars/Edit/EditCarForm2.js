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
import { DatePicker, LocalizationProvider, LoadingButton } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React, { useEffect, useState } from "react";
import CarFormSteps from "../../../components/CarForm/CarEditFormSteps";
import PageTitle from "../../../components/PageTitle/PageTitle";

import {
  PermContactCalendar as ContactIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  Visibility,
  VisibilityOff,
  Assignment as DocumentIcon,
  CameraFront as ImageIcon,
  NavigateNext as NextIcon,
  Cancel as CloseIcon,
  BackupRounded as SubmitIcon,
} from "@material-ui/icons";
import { AppConst } from "../../../constants/appConstants";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import {
  getCarDetails,
  getCarList,
  updateCar,
} from "../../../Actions/carActions";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../../../components/Wrappers/Wrappers";
import { CAR_UPDATE_RESET } from "../../../constants/carConstants";

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

const EditCarForm2 = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [step1, setStep1] = useState({});

  const [carStatus, setCarStatus] = useState("");
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

  const [PUCNumber, setPUCNumber] = useState("");
  const [PUCStartDate, setPUCStartDate] = useState(null);
  const [PUCEndDate, setPUCEndDate] = useState(null);
  const [PUCImageUploading, setPUCImageUploading] = useState("");
  const [PUCImage, setPUCImage] = useState("");

  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [insuranceStartDate, setInsuranceStartDate] = useState(null);
  const [insuranceEndDate, setInsuranceEndDate] = useState(null);
  const [insuranceImage, setInsuranceImage] = useState("");
  const [insuranceImageUploading, setInsuranceImageUploading] = useState("");

  const [carRCTCNo, setCarRCTCNo] = useState("");
  const [carRCTCImage, setCarRCTCImage] = useState("");
  const [carRCTCImageUploading, setCarRCTCImageUploading] = useState("");

  const [RCBookImage, setRCBookImage] = useState("");
  const [RCNumber, setRCNumber] = useState("");
  const [carRCImageUploading, setCarRCImageUploading] = useState("");

  const carUpdate = useSelector((state) => state.carUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = carUpdate;
  const carDetails = useSelector((state) => state.carDetails);
  const { loading, error, car } = carDetails;

  useEffect(() => {
    dispatch(getCarList());
    if (successUpdate) {
      dispatch({ type: CAR_UPDATE_RESET });
    } else if (error) {
      // setSuccess(false);
      // setMessage(error);
    } else {
      if (!car.carName || car._id !== id) {
        dispatch(getCarDetails(id));
      } else {
        setCarName(car.carName);
        setCarNumber(car.carNumber);
        setCarImage(car.carImage);

        setCarPurchaseInvoiceDate(car.carPurchaseInvoiceDate);
        setCarPurchaseInvoice(car.carPurchaseInvoice);

        setCarFitnessStartDate(car.carFitnessStartDate);
        setCarFitnessEndDate(car.carFitnessEndDate);

        setCarFitnessImage(car.carFitnessImage);
        setPUCStartDate(car.PUCStartDate);
        setPUCEndDate(car.PUCEndDate);
        setPUCNumber(car.PUCNumber);
        setPUCImage(car.PUCImage);
        setRCNumber(car.RCNumber);
        setInsuranceNumber(car.insuranceNumber);
        setInsuranceStartDate(car.insuranceStartDate);
        setInsuranceEndDate(car.insuranceEndDate);
        setInsuranceImage(car.insuranceImage);

        setCarRCTCNo(car.carRCTCNo);
        setCarRCTCImage(car.carRCTCImage);
        setRCNumber(car.RCNumber);
        setRCBookImage(car.RCBookImage);
        setCarStatus(car.carStatus);
      }
    }
  }, [id, dispatch, car, successUpdate, error]);

  const updateHandler = () => {
    dispatch(
      updateCar({
        _id: id,
        carName,
        carNumber,
        carImage,
        carRCTCNo,
        carRCTCImage,
        RCNumber,
        RCBookImage,
        PUCNumber,
        PUCImage,
        PUCStartDate,
        PUCEndDate,
        insuranceNumber,
        insuranceImage,
        insuranceStartDate,
        insuranceEndDate,
        carFitnessImage,
        carFitnessStartDate,
        carFitnessEndDate,
        carPurchaseInvoice,
        carPurchaseInvoiceDate,
        carStatus,
      }),
    );
  };

  return (
    <>
      <PageTitle title="Edit Car Form" />
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
        <CarFormSteps step1 step2 id={id} />

        <form
          style={{
            paddingTop: "4%",
            paddingLeft: "4%",
            paddingRight: "4%",
          }}
          onSubmit={updateHandler}
        >
          <Grid
            container
            alignItems="center"
            justify="space-between"
            direction="row"
            spacing={4}
          >
            {" "}
            <Grid item xs={3}>
              {" "}
              <Stack>
                <TextField
                  id="PUC-name"
                  name="pucName"
                  label="PUC Number"
                  type="text"
                  value={PUCNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DocumentIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setPUCNumber(e.target.value);
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              {" "}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack>
                  <DatePicker
                    label="PUC Start Date"
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="dd/MM/yyyy"
                    clearable={true}
                    value={PUCStartDate}
                    onChange={(newValue) => {
                      setPUCStartDate(newValue);
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              {" "}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack>
                  <DatePicker
                    label="PUC End Date"
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="dd/MM/yyyy"
                    clearable={true}
                    minDate={PUCStartDate}
                    value={PUCEndDate}
                    onChange={(newValue) => {
                      setPUCEndDate(newValue);
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              {PUCImage ? (
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  badgeContent={
                    <CloseIcon
                      onClick={() => setPUCImage("")}
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
                      setModalImage(PUCImage);
                    }}
                    src={`${PUCImage}`}
                    sx={{ boxShadow: 4 }}
                  />
                </Badge>
              ) : !PUCImageUploading ? (
                <Stack>
                  <TextField
                    id="puc-image"
                    name="pucImage"
                    label="PUC Image"
                    accept="image/*"
                    type="file"
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
                        `${step1.carName}_${step1.carNumber}_PUC`,
                        {
                          type: file.type,
                        },
                      );
                      const formData = new FormData();
                      formData.append("image", newFile);
                      setPUCImageUploading(true);
                      try {
                        const config = {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        };
                        const { data } = await axios.post(
                          `${AppConst.BASE_URL}/api/upload/car/profile/${step1.carNumber}`,
                          formData,
                          config,
                        );
                        setPUCImage(data);

                        setPUCImageUploading(false);
                      } catch (error) {
                        setPUCImageUploading(false);
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
            {" "}
            <Grid item xs={3}>
              {" "}
              <Stack>
                <TextField
                  id="Insurance-name"
                  name="insuranceName"
                  label="Insurance Number"
                  type="text"
                  value={insuranceNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DocumentIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setInsuranceNumber(e.target.value);
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              {" "}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack>
                  <DatePicker
                    label="Insurance Start Date"
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="dd/MM/yyyy"
                    clearable={true}
                    value={insuranceStartDate}
                    onChange={(newValue) => {
                      setInsuranceStartDate(newValue);
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              {" "}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack>
                  <DatePicker
                    label="Insurance End Date"
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="dd/MM/yyyy"
                    clearable={true}
                    minDate={insuranceStartDate}
                    value={insuranceEndDate}
                    onChange={(newValue) => {
                      setInsuranceEndDate(newValue);
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              {insuranceImage ? (
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  badgeContent={
                    <CloseIcon
                      onClick={() => setInsuranceImage("")}
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
                      setModalImage(insuranceImage);
                    }}
                    src={`${insuranceImage}`}
                    sx={{ boxShadow: 4 }}
                  />
                </Badge>
              ) : !insuranceImageUploading ? (
                <Stack>
                  <TextField
                    id="insurance-image"
                    name="insuranceImage"
                    label="Insurance Image"
                    accept="image/*"
                    type="file"
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
                        `${step1.carName}_${step1.carNumber}_insurance`,
                        {
                          type: file.type,
                        },
                      );
                      const formData = new FormData();
                      formData.append("image", newFile);
                      setInsuranceImageUploading(true);
                      try {
                        const config = {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        };
                        const { data } = await axios.post(
                          `${AppConst.BASE_URL}/api/upload/car/profile/${step1.carNumber}`,
                          formData,
                          config,
                        );
                        setInsuranceImage(data);

                        setInsuranceImageUploading(false);
                      } catch (error) {
                        setInsuranceImageUploading(false);
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
            {" "}
            <Grid item xs={3}>
              {" "}
              <Stack>
                <TextField
                  id="RCTC-number"
                  name="rctcNumber"
                  label="RCTC Number"
                  type="text"
                  value={carRCTCNo}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DocumentIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setCarRCTCNo(e.target.value);
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              {carRCTCImage ? (
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  badgeContent={
                    <CloseIcon
                      onClick={() => setCarRCTCImage("")}
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
                      setModalImage(carRCTCImage);
                    }}
                    src={`${carRCTCImage}`}
                    sx={{ boxShadow: 4 }}
                  />
                </Badge>
              ) : !carRCTCImageUploading ? (
                <Stack>
                  <TextField
                    id="rctc-image"
                    name="rctcImage"
                    label="RCTC Image"
                    accept="image/*"
                    type="file"
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
                        `${step1.carName}_${step1.carNumber}_RCTC`,
                        {
                          type: file.type,
                        },
                      );
                      const formData = new FormData();
                      formData.append("image", newFile);
                      setCarRCTCImageUploading(true);
                      try {
                        const config = {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        };
                        const { data } = await axios.post(
                          `${AppConst.BASE_URL}/api/upload/car/profile/${step1.carNumber}`,
                          formData,
                          config,
                        );
                        setCarRCTCImage(data);

                        setCarRCTCImageUploading(false);
                      } catch (error) {
                        setCarRCTCImageUploading(false);
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
            <Grid item xs={3}>
              {" "}
              <Stack>
                <TextField
                  id="RC-number"
                  name="rcNumber"
                  label="RC Number"
                  type="text"
                  value={RCNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DocumentIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setRCNumber(e.target.value);
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={3}>
              {RCBookImage ? (
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  badgeContent={
                    <CloseIcon
                      onClick={() => setRCBookImage("")}
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
                      setModalImage(RCBookImage);
                    }}
                    src={`${RCBookImage}`}
                    sx={{ boxShadow: 4 }}
                  />
                </Badge>
              ) : !carRCImageUploading ? (
                <Stack>
                  <TextField
                    id="rc-image"
                    name="rcImage"
                    label="RC Image"
                    accept="image/*"
                    type="file"
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
                        `${step1.carName}_${step1.carNumber}_RC`,
                        {
                          type: file.type,
                        },
                      );
                      const formData = new FormData();
                      formData.append("image", newFile);
                      setCarRCImageUploading(true);
                      try {
                        const config = {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        };
                        const { data } = await axios.post(
                          `${AppConst.BASE_URL}/api/upload/car/profile/${step1.carNumber}`,
                          formData,
                          config,
                        );
                        setRCBookImage(data);

                        setCarRCImageUploading(false);
                      } catch (error) {
                        setCarRCImageUploading(false);
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
            justify="center"
            alignItems="center"
            style={{ padding: "2%" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SaveIcon />}
            >
              Update
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

export default EditCarForm2;
