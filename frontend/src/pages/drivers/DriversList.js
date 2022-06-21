import React, { useEffect, useState } from "react";
import {
  InputBase,
  Grid,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
} from "@material-ui/core";
import { Search as SearchIcon, AddCircle as AddIcon } from "@material-ui/icons";
import useStyles from "../dashboard/styles";
import classNames from "classnames";
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import DriversTable from "./DriversTable";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const DriversList = () => {
  var classes = useStyles();
  const dispatch = useDispatch();

  var [isSearchOpen, setSearchOpen] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("active");

  return (
    <>
      <PageTitle title="Drivers List" />
      <Grid item xs={12}>
        <Widget
          style={{
            height: "800px",
          }}
          header={
            <div className={classes.mainChartHeader}>
              <div
                className={classNames(classes.search, {
                  [classes.searchFocused]: isSearchOpen,
                })}
              >
                <div
                  className={classNames(classes.searchIcon, {
                    [classes.searchIconOpened]: isSearchOpen,
                  })}
                  onClick={() => setSearchOpen(!isSearchOpen)}
                >
                  <SearchIcon classes={{ root: classes.headerIcon }} />
                </div>
                <InputBase
                  placeholder="Search by Driver…"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
              <div className={classes.mainChartHeaderLabels}>
                <div className={classes.mainChartHeaderLabel}>
                  <div>
                    <Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      input={
                        <OutlinedInput
                          labelWidth={0}
                          classes={{
                            notchedOutline: classes.mainChartSelectRoot,
                            input: classes.mainChartSelect,
                          }}
                        />
                      }
                      fullWidth
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </div>
                </div>
                <div className={classes.mainChartHeaderLabel}>
                  <Link
                    to={`/app/drivers/add`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                    >
                      ADD DRIVER
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          }
          upperTitle
          noBodyPadding
          // bodyClass={classes.tableWidget}
        >
          <DriversTable keyword={keyword} status={status} />
        </Widget>
      </Grid>
    </>
  );
};

export default DriversList;
