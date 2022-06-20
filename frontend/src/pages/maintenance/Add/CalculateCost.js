import React, { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Typography } from "../../../components/Wrappers/Wrappers";

const CalculateCost = ({ SGST, CGST, basicAmount, calculatedAmount }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (CGST === 0 && SGST > 0) {
      let costWithSGST = (Number(SGST) / 100) * Number(basicAmount);
      setTotalAmount(Number(costWithSGST) + Number(basicAmount));
    } else if (CGST > 0 && SGST === 0) {
      let costWithGST = (Number(CGST) / 100) * Number(basicAmount);

      setTotalAmount(Number(costWithGST) + Number(basicAmount));
    } else if (CGST > 0 && SGST > 0) {
      let costWithGST = (Number(CGST) / 100) * Number(basicAmount);
      let costWithSGST = (Number(SGST) / 100) * Number(basicAmount);
      setTotalAmount(
        Number(basicAmount) + Number(costWithGST) + Number(costWithSGST),
      );
    } else {
      setTotalAmount(Number(basicAmount));
    }
    calculatedAmount(totalAmount.toFixed(2));
  }, [SGST, CGST, basicAmount, calculatedAmount, totalAmount]);
  return (
    <Typography
      variant="h5"
      style={{
        fontWeight: "bold",
      }}
    >
      <FaRupeeSign size={18} /> {totalAmount?.toFixed(2)}
    </Typography>
  );
};

export default CalculateCost;
