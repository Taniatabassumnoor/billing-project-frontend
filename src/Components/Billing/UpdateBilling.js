import {
  Box,
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateBilling = () => {
  const { id } = useParams();
  const [updateBillings, setUpdateBillings] = useState({});
  const loadData = () => {
    fetch("http://localhost:5000/api/billing-list")
      .then((res) => res.json())
      .then((data) => {
        setUpdateBillings(data);
      });
  };
  useEffect(() => {
    loadData();
  }, []);

  // Update User
  const handleNameChange = (e) => {
    const updatedName = e.target.value;
    const updatedData = { ...updateBillings };
    updatedData.fullName = updatedName;
  };

  const handleEmailChange = (e) => {
    const updatedEmail = e.target.value;
    const updatedData = { ...updateBillings };
    updatedData.email = updatedEmail;
  };
  const handlePhoneNumberChange = (e) => {
    const updatedPhoneNumber = e.target.value;
    const updatedData = { ...updateBillings };
    updatedData.email = updatedPhoneNumber;
  };
  const handlePaidAmountChange = (e) => {
    const updatedPaidAmount = e.target.value;
    const updatedData = { ...updateBillings };
    updatedData.email = updatedPaidAmount;
  };
  const handleUpdate = async (e) => {
    // const url = `http://localhost:5000/api/billing-list/${id}`;
    // await fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(updateBillings),
    // }).then((res) => res.json());

    //   .then((data) => {
    //     if (data.modifiedCount > 0) {
    //       alert("Update Successful");
    //       setUpdateBillings({});
    //       e.target.reset();
    //     }
    //   });

    e.preventDefault();
  };

  console.log(id);

  //   modal
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        id="publishButton"
        onClick={handleClickOpen}
        aria-label="show more"
      ></Button>
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
        <form onSubmit={handleUpdate}>
          <Box sx={{ px: 2, pt: 0, pb: 2 }}>
            <Typography>Now edit this bill</Typography>
            <br />
            <Box>
              <Box>
                <input
                  type="text"
                  onChange={handleNameChange}
                  value={updateBillings.fullName || ""}
                />
              </Box>
              <Box>
                <input
                  type="text"
                  onChange={handleEmailChange}
                  value={updateBillings.email || ""}
                />
              </Box>
              <Box>
                <input
                  type="text"
                  onChange={handlePhoneNumberChange}
                  value={updateBillings.phoneNumber || ""}
                />
              </Box>
              <Box>
                <input
                  type="number"
                  onChange={handlePaidAmountChange}
                  value={updateBillings.paidAmount || ""}
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

export default UpdateBilling;
