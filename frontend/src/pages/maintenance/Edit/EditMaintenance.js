import { Divider, Grid, Paper, Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Modal, Box, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import useStyle from "../../dashboard/styles";
import { Button, Stack, TextField } from "@mui/material";
import {
  AddCircle as AddIcon,
  CloseRounded as CloseIcon,
  BackupRounded as SubmitIcon,
  Save as SaveIcon,
} from "@material-ui/icons";

import PageTitle from "../../../components/PageTitle";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Typography } from "../../../components/Wrappers/Wrappers";
import EditMaintenanceType from "./EditMaintenanceType";
import {
  getCarDetails,
  getCarMaintenance,
  updateMaintenance,
} from "../../../Actions/carActions";
import { useDispatch, useSelector } from "react-redux";
import CalculateCost from "../Add/CalculateCost";
import Notification from "../../../components/Notification/Notification";
import AddMaintenanceType from "../Add/AddMaintenanceType";
import { CAR_UPDATE_MAINTENANCE_RESET } from "../../../constants/carConstants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pl: 4,
  pr: 4,
  pb: 4,
};

const EditMaintenance = () => {
  const classes = useStyle();
  const [position] = useState({
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = position;
  const dispatch = useDispatch();
  const { carId, maintenanceId } = useParams();
  const [date, setDate] = useState("");
  const [modalMaintenance, setModalMaintenance] = useState({});
  const [maintenanceTypeModal, setMaintenanceTypeModal] = useState(false);
  const [maintenanceEditTypeModal, setMaintenanceEditTypeModal] = useState(
    false,
  );
  const [paymentMode, setPaymentMode] = useState("");
  const [servicingCenterName, setServicingCenterName] = useState("");
  const [reading, setReading] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [CGST, setCGST] = useState("");
  const [SGST, setSGST] = useState("");
  //   const [maintenanceArr, setMaintenanceArr] = useState([]);
  const [maintenanceTypes, setMaintenanceTypes] = useState([]);
  const [amountAddition, setAmountAddition] = useState(0);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [success, setSuccess] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const carDetails = useSelector((state) => state.carDetails);
  const {
    loading: carDetailsLoading,
    error: carDetailsError,
    car,
  } = carDetails;

  const carMaintenanceDetails = useSelector(
    (state) => state.carMaintenanceDetails,
  );
  const {
    loading: carMaintenanceDetailsLoading,
    error: carMaintenanceDetailsError,
    maintenance: maintenanceObj,
  } = carMaintenanceDetails;

  const carUpdateMaintenance = useSelector(
    (state) => state.carUpdateMaintenance,
  );
  const {
    loading: carUpdateMaintenanceLoading,
    error: carUpdateMaintenanceError,
    success: successUpdate,
  } = carUpdateMaintenance;

  useEffect(() => {
    if (successUpdate) {
      setShowToast(true);
      setSuccess(true);
      console.log("Maintenance Updated Successfully..!!");
      setMessage("Maintenance Updated Successfully..!!");
      dispatch({ type: CAR_UPDATE_MAINTENANCE_RESET });
    } else if (carUpdateMaintenanceError) {
      setSuccess(false);
      setMessage(carUpdateMaintenanceError);
    } else {
      if (!car.carName || car._id !== carId) {
        dispatch(getCarDetails(carId));
        dispatch(getCarMaintenance(carId, maintenanceId));
      } else {
        setDate(maintenanceObj.date);
        setServicingCenterName(maintenanceObj.servicingCenterName);
        setReading(maintenanceObj.reading);
        setInvoiceNumber(maintenanceObj.invoiceNumber);
        setMaintenanceTypes(maintenanceObj.maintenances);
        setSGST(maintenanceObj.SGST);
        setCGST(maintenanceObj.CGST);
        setPaymentMode(maintenanceObj.paymentMode);
      }
    }
    setAmountAddition(
      maintenanceTypes?.reduce((acc, cur) => acc + Number(cur.basicAmount), 0),
    );
  }, [dispatch, maintenanceObj, successUpdate]);

  const calculatedAmount = (amount) => {
    setTotalAmount(amount);
  };

  const maintenance = (list) => {
    setMaintenanceTypes([...maintenanceTypes, list]);
  };

  const removeMaintenance = (m) => {
    setMaintenanceTypes(maintenanceTypes.filter((main) => main !== m));
  };

  const updateHandler = () => {
    dispatch(
      updateMaintenance(carId, maintenanceId, {
        date,
        reading,
        servicingCenterName,
        invoiceNumber,
        maintenances: maintenanceTypes,
        CGST,
        SGST,
        paymentMode,
      }),
    );
  };

  return (
    <>
      <PageTitle title="Edit Maintenance" />
      <Paper>
        <></>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ padding: "10px" }}
        >
          <Typography variant="h4">
            Selected Car:{" "}
            <span
              style={{
                color: "green",
              }}
            >{`${car?.carName}-${car?.carNumber}`}</span>{" "}
          </Typography>
        </Grid>
        <form style={{ padding: "10px" }} onSubmit={updateHandler}>
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
                    label="Maintenance Date"
                    renderInput={(params) => <TextField {...params} required />}
                    inputFormat="dd/MM/yyyy"
                    clearable={true}
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <TextField
                  id="servicing-center"
                  name="servicing"
                  label="Servicing Center"
                  type="text"
                  value={servicingCenterName}
                  onChange={(e) => setServicingCenterName(e.target.value)}
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <TextField
                  id="reading"
                  name="reading"
                  label="Reading"
                  type="number"
                  value={reading}
                  onChange={(e) => setReading(e.target.value)}
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
            <Grid item xs={4}>
              <Stack>
                <TextField
                  // error
                  id="invoice-number"
                  name="invoice"
                  label="Invoice Number"
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
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
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            direction="row"
            spacing={2}
          >
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  setMaintenanceTypeModal(true);
                }}
                disabled={!date}
              >
                ADD
              </Button>
            </Grid>

            <Stack direction="row" spacing={2}>
              {maintenanceTypes?.map((m) => {
                return (
                  <Chip
                    style={{ margin: "8px" }}
                    // deleteIcon={<TbEditCircle />}
                    label={`${m.type}-${m.basicAmount}`}
                    variant="outlined"
                    color="error"
                    onDelete={() => removeMaintenance(m)}
                  />
                );
              })}
            </Stack>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            direction="row"
            spacing={4}
          >
            <Grid item xs={12}>
              <Divider />
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
              <Stack>
                <TextField
                  // error
                  id="cgst"
                  name="CGST"
                  label="CGST"
                  type="number"
                  value={CGST}
                  onChange={(e) => setCGST(e.target.value)}
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <TextField
                  // error
                  id="sgst"
                  name="SGST"
                  label="SGST"
                  type="number"
                  value={SGST}
                  onChange={(e) => setSGST(e.target.value)}
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <TextField
                  // error
                  id="payment-mode"
                  name="payment"
                  label="Payment Mode"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  type="text"
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
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            direction="row"
            spacing={4}
          >
            <Grid item xs={12}>
              {" "}
              Total Amount:
              <CalculateCost
                SGST={SGST}
                CGST={CGST}
                basicAmount={amountAddition}
                totalAmount={totalAmount}
                calculatedAmount={calculatedAmount}
              />
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            direction="row"
            spacing={4}
          >
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>

          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ padding: "10px" }}
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
      </Paper>
      <Modal
        open={maintenanceTypeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item xs={10}></Grid>
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
                  onClick={() => setMaintenanceTypeModal(false)}
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AddMaintenanceType maintenance={maintenance} />
            </Grid>
          </Grid>{" "}
        </Box>
      </Modal>{" "}
      <Modal
        open={maintenanceEditTypeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item xs={10}></Grid>
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
                  onClick={() => setMaintenanceEditTypeModal(false)}
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <EditMaintenanceType maintenance={maintenance} />
            </Grid>
          </Grid>{" "}
        </Box>
      </Modal>{" "}
    </>
  );
};

export default EditMaintenance;
