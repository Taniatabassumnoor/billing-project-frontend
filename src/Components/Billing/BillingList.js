import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import AddBilling from "./AddBilling";
import EditBill from "./EditBill";
import PageButtons from "./PageButtons";

// style
const heroText = {
  textAlign: "center",
  fontSize: "30px",
  mt: "5%",
};
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
const BillingList = () => {
  const [query, setQuery] = useState("");
  const [addBills, setBills] = useState([]);
  const [billings, setBillings] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  // const [count, setCount] = useState(0);
  // const [page, setPage] = React.useState(1);
  // const limit = 10;

  // console.log(count);
  // const handleChange = (event, value) => {
  //   setPage(value - 1);
  // };
  const loadData = () => {
    fetch("https://bloc-inukshuk-13379.herokuapp.com/api/billing-list")
      .then((res) => res.json())
      .then((data) => {
        // setCount(Math.ceil(data.count / limit));
        setBillings(data);
      });
  };
  useEffect(() => {
    loadData();
  }, [isAdding]);

  const handleDelete = async (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      await axios.delete(
        `https://bloc-inukshuk-13379.herokuapp.com/api/billing-list/${id}`
      );
      loadData();
    }
  };
  return (
    <div>
      <Container>
        <AddBilling
          billings={billings}
          setBillings={setBillings}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
        />
        <Box>
          <Paper
            component="form"
            sx={{
              mx: "auto",
              mt: 5,
              display: "flex",
              alignItems: "center",
              width: {
                xs: "100%",
                sm: "100%",
                md: "100%",
              },
              border: "2px solid #43BC8B",
              borderRadius: "10px",
              // boxShadow: "0px 14px 22px rgb(42 135 158 / 7%)",
            }}
          >
            <IconButton sx={{ p: "5px" }} aria-label="menu"></IconButton>
            <InputBase
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              sx={{
                flex: 1,
                mx: "auto",
                fontSize: {
                  xs: "10px",
                  sm: "12px",
                  md: "14px",
                },
              }}
              inputProps={{ "aria-label": "Search" }}
            />
          </Paper>
        </Box>
        {/* <AddBilling addBills={addBills} setBills={setBills} /> */}

        <Typography sx={{ ...heroText }}>Billing Table</Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Billing Id</TableCell>
              <TableCell align="right">Full Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Paid Amount</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billings
              .filter(
                (bill) =>
                  bill.fullName.toLowerCase().includes(query) ||
                  bill.email.toLowerCase().includes(query) ||
                  bill.phoneNumber.toLowerCase().includes(query)
              )
              .map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row._id ? row._id : "generating bill id"}
                  </TableCell>
                  <TableCell align="right">{row.fullName}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phoneNumber}</TableCell>
                  <TableCell align="right">{row.paidAmount}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1}>
                      <EditBill id={row._id} />
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(row._id)}
                      >
                        DELETE
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* <PageButtons
          pageTotal={count}
          page={page}
          handleChange={handleChange}
        /> */}
      </Container>
    </div>
  );
};

export default BillingList;
