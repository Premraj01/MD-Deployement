import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Badge,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Box,
  Modal,
  Skeleton,
} from "@mui/material";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Snackbar,
  Select,
} from "@material-ui/core";
import useStyle from "../../dashboard/styles";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { useHistory, useParams } from "react-router-dom";
import {
  PermContactCalendar as ContactIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  Visibility,
  VisibilityOff,
  Assignment as LicenseIcon,
  CameraFront as ImageIcon,
  Delete as DeleteIcon,
  Cancel as CloseIcon,
} from "@material-ui/icons";
import { FaSave } from "react-icons/fa";
import { DatePicker, LoadingButton, LocalizationProvider } from "@mui/lab";
import { AppConst } from "../../../constants/appConstants";
import axios from "axios";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Typography } from "../../../components/Wrappers/Wrappers";
import { DRIVER_UPDATE_RESET } from "../../../constants/driverConstants";
import { CAR_UPDATE_RESET } from "../../../constants/carConstants";
import { getDriverDetails, updateDriver } from "../../../Actions/driverActions";
import { getCarDetails, getCarList } from "../../../Actions/carActions";
import AssignCar from "../../../components/AssignCar/AssignCar";

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

const EditDriverForm = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const history = useHistory();
  const { id } = useParams();
  const [position] = useState({
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = position;
  const [imageModal, setImageModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [carId, setCarId] = useState("");
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [license, setLicense] = useState("");
  const [licenseImage, setLicenseImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [licenseUploading, setLicenseUploading] = useState(false);
  const [carAssignedDate, setCarAssignedDate] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const driverDetails = useSelector((state) => state.driverDetails);
  const { loading, error, driver } = driverDetails;

  const carDetails = useSelector((state) => state.carDetails);
  const {
    loading: carDetailsLoading,
    error: carDetailsError,
    car,
  } = carDetails;

  const carList = useSelector((state) => state.carList);
  const { loading: carListLoading, error: carListError, cars } = carList;

  const driverUpdate = useSelector((state) => state.driverUpdate);
  const {
    loading: driverUpdateLoading,
    error: driverUpdateError,
    success: driverUpdateSuccess,
  } = driverUpdate;

  const carUpdate = useSelector((state) => state.carUpdate);
  const {
    loading: carUpdateLoading,
    error: carUpdateError,
    success: carUpdateSuccess,
  } = carUpdate;

  useEffect(() => {
    dispatch(getCarList());
    if (driverUpdateSuccess) {
      setSuccess(true);
      setMessage("Driver Updated Successfully..!!");
      dispatch({ type: DRIVER_UPDATE_RESET });
    } else if (carUpdateSuccess) {
      setSuccess(true);
      setMessage("Car Assigned Successfully..!!");
      dispatch({ type: CAR_UPDATE_RESET });
    } else {
      if (!driver.firstName || driver._id !== id) {
        dispatch(getDriverDetails(id));
      } else {
        if (driver.carId) {
          dispatch(getCarDetails(driver.carId));
        }
        setFirstName(driver.firstName);
        setLastName(driver.lastName);
        setMobileNumber(driver.mobileNumber);
        setCarAssignedDate(driver.carAssignedDate);
        setPassword({
          ...password,
          password: driver.password,
        });
        setConfirmPassword(driver.password);
        setLicense(driver.licence);
        setCarId(driver.carId);
        setImage(driver.photo);
        setLicenseImage(driver.licenceImage);
        setBirthDate(driver.birthDate);
        setDesignation(driver.designation);
        setStatus(driver.status);
      }
    }
  }, [dispatch, driver, driverUpdateSuccess, carUpdateSuccess, id]);

  const hasNumber = (str) => {
    return /\d/.test(str);
  };

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const updateHandler = () => {
    dispatch(
      updateDriver({
        _id: id,
        firstName,
        lastName,
        mobileNumber,
        carAssignedDate,
        licence: license,
        password: password.password,
        image,
        licenceImage: licenseImage,
        designation,
        birthDate,
        carId,
        status,
      }),
    );
  };

  return (
    <>
      {loading ? (
        <>
          <PageTitle title="Edit Driver" />
          <Paper>
            <div
              style={{
                paddingLeft: "4%",
                paddingRight: "4%",
              }}
            >
              <Grid
                container
                alignItems="center"
                justify="space-between"
                direction="row"
                spacing={4}
              >
                <Grid item xs={6}>
                  <Stack>
                    <Typography variant="h1">
                      {" "}
                      <Skeleton variant="text" />
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <Typography variant="h1">
                      {" "}
                      <Skeleton variant="text" />
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="space-between"
                direction="row"
                spacing={4}
              >
                <Grid item xs={6}>
                  <Stack>
                    <Typography variant="h1">
                      {" "}
                      <Typography variant="h1">
                        {" "}
                        <Skeleton variant="text" />
                      </Typography>
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <Skeleton variant="circular" width={40} height={40} />
                  </Stack>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="space-between"
                direction="row"
                spacing={4}
              >
                <Grid item xs={6}>
                  <Stack>
                    <Typography variant="h1">
                      {" "}
                      <Skeleton variant="text" />
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <Typography variant="h1">
                      {" "}
                      <Skeleton variant="text" />
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="space-between"
                direction="row"
                spacing={4}
              >
                <Grid item xs={6}>
                  <Stack>
                    <Typography variant="h1">
                      {" "}
                      <Skeleton variant="text" />
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <Typography variant="h1">
                      {" "}
                      <Skeleton variant="circular" width={40} height={40} />
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="space-between"
                direction="row"
                spacing={4}
              >
                <Grid item xs={6}>
                  <Stack>
                    <Typography variant="h1">
                      {" "}
                      <Skeleton variant="text" />
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <Typography variant="h1">
                      {" "}
                      <Skeleton variant="text" />
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </>
      ) : (
        <>
          <PageTitle title="Edit Driver" />

          <Paper>
            {/* <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={2}
              style={{
                paddingLeft: "4%",
                paddingRight: "4%",
                paddingTop: "2%",
                paddingBottom: "2%",
              }}
            >
              <Grid item xs={12}> */}
            <AssignCar driver={driver} id={id} car={{ ...car }} cars={cars} />
            {/* </Grid>
            </Grid> */}
            <form
              onSubmit={updateHandler}
              style={{
                paddingLeft: "4%",
                paddingRight: "4%",
              }}
            >
              <Grid
                container
                alignItems="center"
                justify="space-between"
                direction="row"
                spacing={4}
              >
                <Grid item xs={6}>
                  <Stack>
                    <TextField
                      id="first-name"
                      name="firstName"
                      label="First Name"
                      type="text"
                      value={firstName}
                      helperText={
                        firstName
                          ? !hasNumber(firstName)
                            ? ""
                            : "Only Numbers are allowed"
                          : ""
                      }
                      error={
                        firstName
                          ? !hasNumber(firstName)
                            ? false
                            : true
                          : false
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      required
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <TextField
                      id="last-name"
                      name="lastName"
                      label="Last Name"
                      type="text"
                      value={lastName}
                      helperText={
                        lastName
                          ? !hasNumber(lastName)
                            ? ""
                            : "Only Numbers are allowed"
                          : ""
                      }
                      error={
                        lastName ? (!hasNumber(lastName) ? false : true) : false
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      required
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="space-between"
                direction="row"
                spacing={4}
              >
                <Grid item xs={6}>
                  <Stack>
                    <TextField
                      id="contact"
                      name="contact"
                      label="Mobile Number"
                      type="number"
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                      }}
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ContactIcon />
                          </InputAdornment>
                        ),
                      }}
                      helperText={
                        mobileNumber
                          ? mobileNumber.length > 10
                            ? "Mobile Number is greater than 10 digits"
                            : mobileNumber.length === 10
                            ? ""
                            : "Mobile Number is less than 10 digits"
                          : ""
                      }
                      error={
                        mobileNumber
                          ? mobileNumber.length > 10
                            ? true
                            : mobileNumber.length === 10
                            ? false
                            : true
                          : false
                      }
                      required
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  {image ? (
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      badgeContent={
                        <CloseIcon
                          onClick={() => setImage("")}
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
                          setModalImage(image);
                        }}
                        src={`${image}`}
                        sx={{ boxShadow: 4 }}
                      />
                    </Badge>
                  ) : !uploading ? (
                    <Stack>
                      <TextField
                        id="profile-image"
                        name="profile"
                        label="Profile Image"
                        accept="image/*"
                        type="file"
                        disabled={
                          firstName.length > 0 && lastName.length > 0
                            ? false
                            : true
                        }
                        helperText={
                          firstName.length > 0 && lastName.length > 0
                            ? ""
                            : "Please Enter First and Last Name"
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
                            `${firstName}_${mobileNumber}_Profile`,
                            {
                              type: file.type,
                            },
                          );
                          const formData = new FormData();
                          formData.append("image", newFile);

                          setUploading(true);

                          try {
                            const config = {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            };
                            const { data } = await axios.post(
                              `${AppConst.BASE_URL}/api/upload/driver/${firstName}/${lastName}`,
                              formData,
                              config,
                            );
                            setImage(data);
                            setUploading(false);
                          } catch (error) {
                            setUploading(false);
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
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack>
                      <DatePicker
                        label="Birth Date"
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="dd/MM/yyyy"
                        clearable={true}
                        value={birthDate}
                        onChange={(newValue) => {
                          setBirthDate(newValue);
                        }}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="select-label">
                        <em>Choose Designation</em>
                      </InputLabel>
                      <Select
                        labelId="select-label"
                        label="Choose Designation"
                        defaultValue={designation}
                        value={designation}
                        onChange={(e) => {
                          setDesignation(e.target.value);
                        }}
                        autoWidth
                      >
                        <MenuItem value="">
                          <em>Choose Designation</em>
                        </MenuItem>

                        <MenuItem value="Driver">Driver</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="space-between"
                direction="row"
                spacing={4}
              >
                <Grid item xs={6}>
                  <Stack>
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
                      type={password.showPassword ? "text" : "password"}
                      value={password.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            onMouseDown={handleMouseDownPassword}
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {password.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => {
                        setPassword({
                          ...password,
                          password: e.target.value,
                        });
                      }}
                      required
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack>
                    <TextField
                      id="cnf-password"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      color={
                        password && confirmPassword
                          ? password.password === confirmPassword
                            ? "success"
                            : ""
                          : ""
                      }
                      error={
                        password && confirmPassword
                          ? password.password === confirmPassword
                            ? false
                            : true
                          : false
                      }
                      helperText={
                        password && confirmPassword
                          ? password.password === confirmPassword
                            ? "Password Matched"
                            : "Password does not match"
                          : ""
                      }
                      required
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                justify="space-between"
                direction="row"
                spacing={4}
              >
                <Grid item xs={6}>
                  <Stack>
                    <TextField
                      id="license"
                      name="license"
                      label="License Number"
                      type="text"
                      value={license}
                      onChange={(e) => {
                        setLicense(e.target.value);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LicenseIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  {licenseImage ? (
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      badgeContent={
                        <CloseIcon
                          onClick={() => setLicenseImage("")}
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
                          setModalImage(licenseImage);
                        }}
                        src={`${licenseImage}`}
                        sx={{ boxShadow: 4 }}
                      />
                    </Badge>
                  ) : !licenseUploading ? (
                    <Stack>
                      <TextField
                        id="license-image"
                        name="license"
                        label="License Image"
                        accept="image/*"
                        type="file"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ImageIcon />
                            </InputAdornment>
                          ),
                        }}
                        disabled={
                          firstName.length > 0 && lastName.length > 0
                            ? false
                            : true
                        }
                        helperText={
                          firstName.length > 0 && lastName.length > 0
                            ? ""
                            : "Please Enter First and Last Name"
                        }
                        onChange={async (e) => {
                          const file = e.target.files[0];

                          var blob = file.slice(0, file.size, file.type);
                          var newFile = new File(
                            [blob],
                            `${firstName}_${mobileNumber}_License`,
                            {
                              type: file.type,
                            },
                          );
                          const formData = new FormData();
                          formData.append("image", newFile);

                          setLicenseUploading(true);

                          try {
                            const config = {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            };

                            const { data } = await axios.post(
                              `${AppConst.BASE_URL}/api/upload/driver/${firstName}/${lastName}`,
                              formData,
                              config,
                            );
                            setLicenseImage(data);
                            setLicenseUploading(false);
                          } catch (error) {
                            setLicenseUploading(false);
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
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack>
                      <DatePicker
                        label="Joining Date"
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="dd/MM/yyyy"
                        clearable={true}
                        value={carAssignedDate}
                        onChange={(newValue) => {
                          setCarAssignedDate(newValue);
                        }}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}></Grid>
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
                  endIcon={<FaSave />}
                >
                  Save
                </Button>
              </Grid>
            </form>
          </Paper>
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
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <img
                    alt=""
                    style={{ height: "50%", width: "50%" }}
                    src={`${modalImage}`}
                  />
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default EditDriverForm;
