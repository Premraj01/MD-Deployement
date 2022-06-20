import { Button, Grid } from "@material-ui/core";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { AddCircle as AddIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Typography } from "../../../components/Wrappers/Wrappers";

const AddMaintenanceType = ({ maintenance }) => {
  const [basicAmount, setBasicAmount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState("");

  const addMaintenance = () => {
    maintenance({
      type,
      basicAmount,
      quantity,
    });

    setType("");
    setQuantity(1);
    setBasicAmount(0);
  };
  return (
    <>
      <Grid
        style={{
          paddingBottom: "6px",
          paddingLeft: "6px",
          paddingRight: "6px",
        }}
        container
        justify="center"
        alignItems="center"
      >
        <Typography variant="h4">Services</Typography>
      </Grid>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        direction="row"
        spacing={4}
      >
        <Grid item xs={12}>
          <Stack>
            <TextField
              // error
              id="service-type"
              name="Service Type"
              label="Service Type"
              type="text"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
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
              // error
              id="quantity"
              name="quantity"
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack>
            <TextField
              // error
              id="amount"
              name="amount"
              label="Amount"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaRupeeSign />
                  </InputAdornment>
                ),
              }}
              value={basicAmount}
              onChange={(e) => {
                setBasicAmount(e.target.value);
              }}
            />
          </Stack>
        </Grid>
      </Grid>

      <Grid
        container
        alignItems="center"
        justify="center"
        direction="row"
        spacing={4}
        style={{ padding: "10px" }}
      >
        <Grid container justify="center" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={addMaintenance}
            endIcon={<AddIcon />}
            disabled={!type}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddMaintenanceType;
