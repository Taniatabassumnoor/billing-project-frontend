import {
  Box,
  Fade,
  Modal,
  TextField,
  Typography,
  Backdrop,
  Button,
  DialogActions,
  Dialog,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";

import React, { useState } from "react";
import axios from "axios";
import BillingForm from "./BillingForm";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddBilling = ({ billings, setBillings, isAdding, setIsAdding }) => {
  return (
    <>
      <BillingForm
        billings={billings}
        setBillings={setBillings}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        isPost={true}
      />
    </>
  );
};

export default AddBilling;
