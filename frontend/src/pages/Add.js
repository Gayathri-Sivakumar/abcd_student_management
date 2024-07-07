import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

function Add() {
  const [values, setValues] = useState({
    enrollment_number: "",
    student_first_name: "",
    student_last_Name: "",
    phone_number: "",
    email: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!validateFields()) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await axios.post("http://localhost:8081/students", values, {
        headers: {
          Authorization: token,
        },
      });
      setMessage("Student added successfully.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding student:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  // Function to validate input fields based on Sequelize model constraints
  const validateFields = () => {
    if (!values.enrollment_number || values.enrollment_number.length !== 6) {
      setError("Enrollment Number must be exactly 6 characters.");
      return false;
    }

    if (!values.student_first_name) {
      setError("First Name is required.");
      return false;
    }

    if (!values.student_last_Name) {
      setError("Last Name is required.");
      return false;
    }

    if (!values.phone_number || values.phone_number.length !== 10) {
      setError("Phone Number must be exactly 10 digits.");
      return false;
    }

    if (!values.email || !/^\S+@\S+\.\S+$/.test(values.email)) {
      setError("Invalid Email format.");
      return false;
    }

    return true;
  };

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="w-50 bg-light rounded p-3">
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <h2>Add Students</h2>
          <div className="mb-2">
            <label htmlFor="enrollmentNumber">Enrollment Number</label>
            <input
              type="text"
              id="enrollmentNumber"
              placeholder="Enter Enrollment Number"
              className="form-control"
              value={values.enrollment_number}
              onChange={(e) =>
                setValues({ ...values, enrollment_number: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              className="form-control"
              value={values.student_first_name}
              onChange={(e) =>
                setValues({ ...values, student_first_name: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              className="form-control"
              value={values.student_last_Name}
              onChange={(e) =>
                setValues({ ...values, student_last_Name: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              className="form-control"
              value={values.phone_number}
              onChange={(e) =>
                setValues({ ...values, phone_number: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary me-2"
              onClick={() => navigate("/dashboard")}
            >
              Back
            </button>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;
