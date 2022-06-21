import React, { useEffect, useState } from "react";
import { Typography } from "../Wrappers/Wrappers";
import { MenuItem } from "@material-ui/core";
import useStyles from "./styles";

const MonthlyTripReading = ({ drivers }) => {
  var classes = useStyles();

  const [driver, setDriver] = useState([]);

  useEffect(() => {
    console.log(drivers);
    driversArray();
  }, []);

  const driversArray = () => {
    let driverArr = [];
    drivers?.map((d) => {
      // setDriver([...driver, d]);}
      if (d.monthlyTripReading > 1150 && d.status !== "inactive") {
        driverArr.push(d);
      }
    });
    setDriver([...driverArr]);
  };

  return (
    <>
      {driver?.map((notification) => (
        <MenuItem
          key={notification.id}
          // onClick={() => setNotificationsMenu(null)}
          className={classes.headerMenuItem}
        >
          <>
            <div className={classes.messageContainer}>
              <Typography style={{ fontSize: "12px" }}>
                <span>
                  {notification.firstName} {notification.lastName}
                </span>{" "}
                has completed <span>{notification.monthlyTripReading} Km</span>{" "}
                for this month.
              </Typography>
            </div>
          </>
        </MenuItem>
      ))}
    </>
  );
};

export default MonthlyTripReading;
