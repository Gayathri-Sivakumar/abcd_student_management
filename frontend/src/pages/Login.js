import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/login",
        formData
      );
      console.log("Full response:", response);
      if (response && response.data) {
        console.log("Response data:", response.data);
        navigate("/dashboard");
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error response data:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="E-mail"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                name="password"
                type="password"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
