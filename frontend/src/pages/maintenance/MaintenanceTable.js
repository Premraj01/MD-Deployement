import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TbEditCircle } from "react-icons/tb";
import fs from "file-saver";
import {
  ListAltRounded as ListIcon,
  CloudDownload as DownloadIcon,
  CloseRounded as CloseIcon,
} from "@material-ui/icons";
import { FaRupeeSign } from "react-icons/fa";
import useStyles from "../dashboard/styles";
import { Box, Modal, Skeleton } from "@mui/material";
import React, { useState } from "react";
import { displayDateFormate } from "../../Services/DateFormate";
import { Typography } from "../../components/Wrappers/Wrappers";
import { Workbook } from "exceljs";
import { Link } from "react-router-dom";

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

const MaintenanceTable = ({ maintenanceList, loading, car }) => {
  var classes = useStyles();
  const [maintenancesList, setMaintenancesList] = useState("");
  const [maintenancesModal, setMaintenanceModal] = useState(false);

  const exportToCsv = (carObj) => {
    let workbook = new Workbook();

    let title = `           ${"Fuel Maintenance of"} ${car?.carName}-${
      car?.carNumber
    }`;

    let descriptionCenter = [
      // `${"Servicing Details"}`,
      // `${"Vehicle Details"}`,
      `${" "}`,
      `Service Center Name:${carObj.servicingCenterName}`,

      // ,`Invoice No:${carObj.invoiceNumber}`,
      // `Service Center GSTIN:,${" "}`,`Invoice Date:${displayDateFormate(
      // 	carObj.date,
      // )}`,
      // `${" "},Odometer:${carObj.reading}Km,${" "},Vehicle Reg.:${
      // 	selectCar.carNumber
      // }`,
      // ` `,
    ];

    let headers = [
      "sr.No",
      "Details of Service",
      "HSN SAC",
      "Unit Price",
      "Qty",
      "Final Price",
    ];

    let usersCsv = carObj.maintenances.reduce((acc, car, i) => {
      acc.push([
        `${i + 1}`,
        `${car.type}`,
        ` `,
        `${car.basicAmount}`,
        `${car.quantity}`,
        `${car.basicAmount}`,
      ]);
      return acc;
    }, []);

    let totalAmount = [
      `${" "}`,
      `${" "}`,
      `${" "}`,
      `${"CGST"}:${carObj.CGST}%`,
      `${"SGST"}:${carObj.SGST}%`,
      `${"Total"}:${carObj.totalAmount}`,
    ];

    let workSheet = workbook.addWorksheet("Maintenance Data");

    let titleRow = workSheet.addRow([title]);
    titleRow.font = {
      name: "Roboto sans-serif",
      family: 4,
      size: 12,
      bold: true,
    };

    let headerDescription = workSheet.addRow(descriptionCenter);
    headerDescription.font = {
      name: "Roboto sans-serif",
      family: 4,
      size: 8,
    };
    workSheet.mergeCells("B2:C2");

    workSheet.getCell("D2").value = `Servicing Date:${displayDateFormate(
      carObj.date,
    )}`;
    workSheet.addRow([]);

    let headerRow = workSheet.addRow(headers);

    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFF00" },
        bgColor: { argb: "FF0000FF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    const serviceCol = workSheet.getColumn(2);

    serviceCol.width = 20;

    usersCsv.forEach((d) => {
      let row = workSheet.addRow(d);
      let qty = row.getCell(5);
    });

    workSheet.addRow([]);
    let footer = workSheet.addRow(totalAmount);

    footer.font = {
      name: "Roboto sans-serif",
      family: 4,
      size: 10,
    };

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      fs.saveAs(
        blob,
        `${car?.carNumber}_${displayDateFormate(
          carObj.date,
        )}_Maintenance_History.xlsx`,
      );
    });
  };

  return (
    <>
      {loading ? (
        <TableContainer>
          <Table stickyHeader className="mb-0">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Reading(in KM)</TableCell>
                <TableCell>Servicing Center</TableCell>
                <TableCell>Invoice Number</TableCell>
                <TableCell>Tax</TableCell>
                <TableCell>Payment Mode</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(10)].map((_, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden", height: "200px" }}>
          <TableContainer>
            <Table stickyHeader className="mb-0">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Reading(in KM)</TableCell>
                  <TableCell>Servicing Center</TableCell>
                  <TableCell>Invoice Number</TableCell>
                  <TableCell>Tax</TableCell>
                  <TableCell>Payment Mode</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {maintenanceList.map((m, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{displayDateFormate(m.date)}</TableCell>
                      <TableCell>{m.reading}</TableCell>
                      <TableCell>{m.servicingCenterName}</TableCell>
                      <TableCell>{m.invoiceNumber}</TableCell>
                      <TableCell>
                        <Typography>CSGT:{m.CGST}%</Typography>
                        <Typography>SGST:{m.SGST}%</Typography>
                      </TableCell>
                      <TableCell>{m.paymentMode}</TableCell>
                      <TableCell>
                        {" "}
                        <div className={classes.mainChartHeader}>
                          <div className={classes.mainChartHeaderLabels}>
                            <div>
                              <IconButton
                                color="primary"
                                className={classes.noPadding}
                                onClick={() => {
                                  setMaintenancesList(m);
                                  setMaintenanceModal(true);
                                }}
                              >
                                <ListIcon />
                              </IconButton>
                            </div>
                            <div>
                              <IconButton
                                color="primary"
                                onClick={() => exportToCsv(m)}
                                className={classes.noPadding}
                              >
                                <DownloadIcon />
                              </IconButton>
                            </div>
                            <div>
                              <Link
                                to={`/app/carMaintenance/edit/${car._id}/${m._id}`}
                              >
                                <IconButton
                                  color="primary"
                                  className={classes.noPadding}
                                >
                                  <TbEditCircle />
                                </IconButton>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <Modal
                        open={maintenancesModal}
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
                            <Grid item xs={11}>
                              <Typography
                                style={{
                                  margin: "6px",
                                  fontWeight: "bold",
                                }}
                              >
                                Total Amount:
                                <FaRupeeSign />
                                {maintenancesList?.totalAmount}
                              </Typography>
                            </Grid>
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
                                  onClick={() => setMaintenanceModal(false)}
                                />
                              </Typography>
                            </Grid>
                          </Grid>
                          <TableContainer>
                            <Table stickyHeader className="mb-0">
                              <TableHead>
                                <TableRow>
                                  <TableCell>sr.No</TableCell>
                                  <TableCell>Type</TableCell>
                                  <TableCell>Quantity</TableCell>
                                  <TableCell>Amount</TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {maintenancesList?.maintenances?.map((m, i) => {
                                  return (
                                    <TableRow key={i}>
                                      <TableCell>{i + 1}</TableCell>
                                      <TableCell>{m.type}</TableCell>
                                      <TableCell>{m.quantity}</TableCell>
                                      <TableCell>{m.basicAmount}</TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </Modal>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
};

export default MaintenanceTable;
