import React, { useState } from "react";
import { Grid, TextField, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Alert } from "react-bootstrap";
const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/auth/login",
        formData
      );
      console.log("Full response:", response);
      if (response && response.data) {
        console.log("Response data:", response.data);
        localStorage.setItem("authToken", response.data.token);
        navigate("/dashboard");
      } else {
        console.error("Unexpected response structure:", response);
        setError("An error occurred. Please try again later.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error response data:", error.response.data);
        setError(error.response.data.error);
      } else {
        console.error("Error:", error.message);
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <Grid container component="main" className="login-grid">
        <Grid item xs={false} sm={4} md={7} className="login-image" />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className="login-paper"
        >
          <div className="login-content">
            {error && <Alert variant="danger">{error}</Alert>}
            <Typography component="h1" variant="h5">
              Welcome Back
            </Typography>
            <form onSubmit={handleSubmit} className="login-form">
              <TextField
                id="email"
                label="E-mail"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                name="password"
                type="password"
                required
                error={!!errors.password}
                helperText={errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="login-button"
              >
                Log In
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
