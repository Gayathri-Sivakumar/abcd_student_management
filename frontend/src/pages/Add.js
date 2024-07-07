import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Add() {
  const [values, setValues] = useState({
    enrollment_number: "",
    student_first_name: "",
    student_last_Name: "",
    phone_number: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    axios
      .post("http://localhost:8081/student", values)
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-blue justify-content-center align-items-center">
      <div className="w-50 bg-blue rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add Students</h2>
          <div className="mb-2">
            <label htmlFor="">Enrollment Number</label>
            <input
              type="text"
              placeholder="Enter Enrollment Number"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, enrollment_number: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, student_first_name: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, student_last_Name: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, phone_number: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="Enter "
              className="form-control"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
