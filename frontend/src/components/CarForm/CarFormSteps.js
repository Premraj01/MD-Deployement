import { Grid } from "@material-ui/core";
import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "../Wrappers/Wrappers";

const CarFormSteps = ({ step1, step2 }) => {
  return (
    <Grid
      container
      align="center"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={5}></Grid>
      {step1 ? (
        <Grid item xs={1}>
          <Link
            to={`/app/cars/add`}
            style={{
              textDecoration: "none",
            }}
          >
            <Button variant="text" color="success">
              step1
            </Button>
          </Link>
        </Grid>
      ) : (
        <Grid item xs={1}>
          <Button variant="text" color="success" disabled>
            step1
          </Button>
        </Grid>
      )}
      {step2 ? (
        <Grid item xs={1}>
          <Button variant="text" color="success">
            step2
          </Button>
        </Grid>
      ) : (
        <Grid item xs={1}>
          <Button variant="text" color="success" disabled>
            step2
          </Button>
        </Grid>
      )}
      <Grid item xs={5}></Grid>
    </Grid>
  );
};

export default CarFormSteps;
