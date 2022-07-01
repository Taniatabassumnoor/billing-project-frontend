import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BillingForm from "./BillingForm";

const EditBill = ({ id }) => {
  const [bill, setBill] = useState({});

  useEffect(() => {
    axios
      .put(`https://bloc-inukshuk-13379.herokuapp.com/api/billing-list/${id}`)
      .then((res) => {
        setBill(res.data);
      });
  }, [id]);
  return (
    <>
      <BillingForm isPost={false} bill={bill} />
    </>
  );
};

export default EditBill;
