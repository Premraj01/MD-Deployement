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
} from "@material-ui/icons";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Typography } from "../../../components/Wrappers/Wrappers";
import AddMaintenanceType from "./AddMaintenanceType";
import { addMaintenance, getCarDetails } from "../../../Actions/carActions";
import { useDispatch, useSelector } from "react-redux";
import CalculateCost from "./CalculateCost";
import Notification from "../../../components/Notification/Notification";
import PageTitle from "../../../components/PageTitle/PageTitle";

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

const AddMaintenance = () => {
  const { carId } = useParams();
  const dispatch = useDispatch();
  const classes = useStyle();
  const [position] = useState({
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = position;
  const [date, setDate] = useState(null);
  const [maintenanceTypes, setMaintenanceTypes] = useState([]);
  const [maintenanceTypeModal, setMaintenanceTypeModal] = useState(false);
  const [calculateServiceAmount, setCalculateServiceAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [reading, setReading] = useState(0);
  const [CGST, setCGST] = useState(0);
  const [SGST, setSGST] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [servicingCenterName, setServicingCenterName] = useState("");

  const carDetails = useSelector((state) => state.carDetails);
  const { car } = carDetails;

  const carAddMaintenance = useSelector((state) => state.carAddMaintenance);
  const { success } = carAddMaintenance;

  useEffect(() => {
    dispatch(getCarDetails(carId));
    setCalculateServiceAmount(
      maintenanceTypes?.reduce((acc, cur) => acc + Number(cur.basicAmount), 0),
    );
  }, [dispatch, carId, maintenanceTypes]);

  const maintenance = (list) => {
    setMaintenanceTypes([...maintenanceTypes, list]);
  };

  const handleSubmit = () => {
    dispatch(
      addMaintenance({
        carId,
        date,
        reading,
        paymentMode,
        totalAmount,
        servicingCenterName,
        invoiceNumber,
        CGST,
        SGST,
        maintenanceTypes,
      }),
    );
    setDate(null);
    setReading(0);
  };

  const removeMaintenance = (m) => {
    setMaintenanceTypes(maintenanceTypes.filter((main) => main !== m));
  };

  const calculatedAmount = (amount) => {
    setTotalAmount(amount);
  };

  return (
    <>
      <PageTitle title="Add Maintenance" />

      <Paper>
        <>
          <Snackbar
            open={success}
            autoHideDuration={1000}
            onClose={success}
            anchorOrigin={{ vertical, horizontal }}
          >
            <Notification
              className={classes.notificationItem}
              shadowless
              type="success"
              message="Expense added successfully..!"
              variant="contained"
              color="success"
            />
          </Snackbar>
        </>
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
        <form style={{ padding: "10px" }} onSubmit={handleSubmit}>
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
            <Grid
              container
              alignItems="center"
              justify="space-between"
              direction="row"
              spacing={4}
            >
              <Grid item xs={12}>
                {maintenanceTypes.map((m) => {
                  return (
                    <Chip
                      style={{ margin: "6px" }}
                      label={`${m.type}-${m.basicAmount}`}
                      variant="outlined"
                      color="error"
                      onDelete={() => removeMaintenance(m)}
                    />
                  );
                })}
              </Grid>
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
            <Grid item xs={4}>
              <Stack>
                <TextField
                  // error
                  id="cgst"
                  name="CGST"
                  label="CGST"
                  type="number"
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
                basicAmount={calculateServiceAmount}
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
              endIcon={<SubmitIcon />}
            >
              Submit
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
      </Modal>
    </>
  );
};

export default AddMaintenance;
