import { TextField, Typography, Container, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import BillingList from "../Billing/BillingList";

const Login = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    data.username = username;
    data.password = password;
    reset();
    axios
      .post("https://bloc-inukshuk-13379.herokuapp.com/api/login", data)
      .then((response) => {
        window.alert("Successfully Registered", "Successfully Registered");
        navigate("/billingList");
      })

      .catch((error) => {
        !error.status === 200 &&
          alert("error", "Bad Request, Places Try again");
        console.log(error);
      });
    // <Navigate to="/billingList" replace={true} />;
  };
  // style=====
  const heroText = {
    textAlign: "center",
    fontSize: "30px",
    mt: "5%",
  };
  const input = {
    my: 2,
  };
  return (
    <div>
      <h1>Please Login here</h1>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            size="small"
            sx={{ ...input }}
            variant="outlined"
            {...register("username", { required: true })}
            fullWidth
            label="Your Name"
          />
          <br />
          <TextField
            size="small"
            variant="outlined"
            sx={{ ...input }}
            {...register("password", { required: true })}
            fullWidth
            label="Your Password"
            autoFocus
          />
          <br />

          {errors.exampleRequired && <span>This field is required</span>}

          <Button variant="contained" type="submit">
            Login
          </Button>
          <Link style={{ textDecoration: "none" }} to="/">
            {" "}
            <Button>New User? Register Here</Button>
          </Link>
        </form>
      </Container>
      <BillingList />
    </div>
  );
};

export default Login;
