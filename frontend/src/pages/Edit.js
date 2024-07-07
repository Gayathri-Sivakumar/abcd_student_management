import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { Alert } from "react-bootstrap";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    enrollment_number: "",
    student_first_name: "",
    student_last_name: "",
    phone_number: "",
    email: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/students/${id}`)
      .then((res) => {
        console.log(res);
        setValues({
          enrollment_number: res.data.enrollment_number,
          student_first_name: res.data.student_first_name,
          student_last_name: res.data.student_last_Name, // Correct key
          phone_number: res.data.phone_number,
          email: res.data.email,
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();

    // Validate input fields
    if (!validateFields()) {
      return;
    }

    axios
      .put(`/students/${id}`, values)
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => console.error(err));
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

    if (!values.student_last_name) {
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
        <form onSubmit={handleUpdate}>
          <h2>Update Student Details</h2>
          {error && <Alert variant="danger">{error}</Alert>}
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
              value={values.student_last_name}
              onChange={(e) =>
                setValues({ ...values, student_last_name: e.target.value })
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
              type="text"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-end  mt-3">
            <button type="submit" className="btn btn-success me-2">
              Update
            </button>
            <button
              className="btn btn-primary ml-2"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
