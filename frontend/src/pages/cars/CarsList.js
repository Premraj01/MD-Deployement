import React, { useState } from "react";
import { InputBase, Grid, Button } from "@material-ui/core";
import { Search as SearchIcon, AddCircle as AddIcon } from "@material-ui/icons";
import useStyles from "../dashboard/styles";
import classNames from "classnames";
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import CarsTable from "./CarsTable";
import { Link } from "react-router-dom";

const CarsList = () => {
  var classes = useStyles();

  var [isSearchOpen, setSearchOpen] = useState(true);
  const [keyword, setKeyword] = useState("");
  return (
    <>
      <PageTitle title="Cars List" />
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
                  placeholder="Search Car..."
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
                  <Link to={`/app/cars/add`} style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                    >
                      ADD CAR
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
          <CarsTable keyword={keyword} />
        </Widget>
      </Grid>
    </>
  );
};

export default CarsList;
