import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Snackbar,
  Select,
} from "@material-ui/core";
import { DatePicker, LocalizationProvider, LoadingButton } from "@mui/lab";
import {
  Avatar,
  Badge,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Box,
  Modal,
} from "@mui/material";
import {
  PermContactCalendar as ContactIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  Visibility,
  VisibilityOff,
  Assignment as LicenseIcon,
  CameraFront as ImageIcon,
  BackupRounded as SubmitIcon,
  Cancel as CloseIcon,
} from "@material-ui/icons";

import useStyle from "../../dashboard/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCarList } from "../../../Actions/carActions";
import { registerDriver } from "../../../Actions/driverActions";
import { useHistory } from "react-router-dom";
import Notification from "../../../components/Notification/Notification";
import { AppConst } from "../../../constants/appConstants";
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

const AddDriverForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyle();
  const [position] = useState({
    vertical: "top",
    horizontal: "right",
  });
  const [alert, setAlert] = useState(false);
  const { vertical, horizontal } = position;
  const [imageModal, setImageModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [image, setImage] = useState("");
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

  const carList = useSelector((state) => state.carList);
  const { cars } = carList;

  const driverRegister = useSelector((state) => state.driverRegister);
  const { error, driverInfo } = driverRegister;

  useEffect(() => {
    dispatch(getCarList());
    if (driverInfo) {
      if (Object.keys(driverInfo).length !== 0) {
        setSuccess(true);
        setAlert(true);
        setMessage("Driver added successfully...!");
        setTimeout(() => {
          history.push(`/app/drivers/list?driverInfo`);
        }, 1000);
      }
    } else if (error) {
      setAlert(true);
      setSuccess(false);
      setMessage(error);
    }
  }, [dispatch, driverInfo, birthDate, error, history]);

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

  const submitHandler = (e) => {
    dispatch(
      registerDriver(
        firstName,
        lastName,
        mobileNumber,
        password,
        image,
        license,
        licenseImage,
        designation,
        birthDate,
        carAssignedDate,
        carId,
      ),
    );

    e.preventDefault();
  };

  return (
    <>
      <PageTitle title="Driver Form" />
      <Stack>
        <Snackbar
          open={alert}
          autoHideDuration={1000}
          onClose={() => setAlert(false)}
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
        </Snackbar>
      </Stack>
      <Paper>
        <form
          onSubmit={submitHandler}
          style={{
            paddingTop: "4%",
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
                    firstName ? (!hasNumber(firstName) ? false : true) : false
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
                      firstName.length > 0 && lastName.length > 0 ? false : true
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
                      firstName.length > 0 && lastName.length > 0 ? false : true
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
            <Grid item xs={6}>
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

                    {cars.map((c) => {
                      if (c.carStatus === false) {
                        return (
                          <MenuItem value={c} key={c._id}>
                            {c.carName + "-" + c.carNumber}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </FormControl>
              </Stack>
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
              endIcon={<SubmitIcon />}
            >
              Submit
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
          <img
            alt=""
            style={{ height: "100%", width: "100%" }}
            src={`${modalImage}`}
          />
        </Box>
      </Modal>
    </>
  );
};

export default AddDriverForm;
