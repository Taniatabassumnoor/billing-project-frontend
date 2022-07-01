import {
  Box,
  Typography,
  Button,
  DialogActions,
  Dialog,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
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

const BillingForm = ({
  isPost,
  billings,
  setBillings,
  isAdding,
  setIsAdding,
  bill,
}) => {
  // basic modal code
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (isPost) {
      // to imediate show on ui
      setBillings([data, ...billings]);
      // then posting to the server
      axios
        .post("https://bloc-inukshuk-13379.herokuapp.com/api/add-billing", data)
        .then((res) => {
          if (res.data.acknowledged) {
            reset();
          }
          setIsAdding(!isAdding);
          setOpen(false);
        });
    } else {
      // put code
      console.log("yeaaaaaa! here u can put");
    }
  };

  return (
    <div>
      <Button
        id="publishButton"
        onClick={handleClickOpen}
        aria-label="show more"
        variant="contained"
      >
        {isPost ? "Add Bill" : "EDIT"}
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "end",
          }}
        >
          <IconButton onClick={handleClose} color="primary" aria-label="cancel">
            close
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ px: 2, pt: 0, pb: 2 }}>
            <Typography>
              {isPost ? "Please add new bill" : "Now edit this bill"}
            </Typography>
            <br />
            <Box>
              <Box>
                <input
                  type="text"
                  {...register("fullName", { required: true })}
                  placeholder="fullName"
                  defaultValue={isPost ? "" : bill.fullName}
                />
              </Box>
              <Box>
                <input
                  type="text"
                  {...register("email", { required: true })}
                  placeholder="email"
                  defaultValue={isPost ? "" : bill.email}
                />
              </Box>
              <Box>
                <input
                  type="text"
                  {...register("phoneNumber", { required: true })}
                  placeholder="phoneNumber"
                  defaultValue={isPost ? "" : bill.phoneNumber}
                />
              </Box>
              <Box>
                <input
                  {...register("paidAmount", { required: true })}
                  placeholder="setPaidAmount"
                  defaultValue={isPost ? "" : bill.paidAmount}
                />
              </Box>
              <br />
            </Box>
          </Box>

          <DialogActions sx={{ pt: 0 }}>
            <Button size="small" type="submit">
              Save
            </Button>
            <Button size="small" onClick={handleClose} id="publishButton">
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default BillingForm;
