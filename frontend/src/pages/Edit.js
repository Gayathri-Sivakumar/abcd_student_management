import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          enrollment_number: res.data.enrollment_number,
          student_first_name: res.data.student_first_name,
          student_last_name: res.data.student_last_Name,
          phone_number: res.data.phone_number,
          student_email: res.data.email,
        });
      })
      .catch((err) => console.error(err));
  }, []);
  const [values, setValues] = useState({
    enrollment_number: "",
    student_first_name: "",
    student_last_Name: "",
    phone_number: "",
    email: "",
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/update/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-black justify-content-center align-items-center">
      <div className="w-50 bg-blue rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update Student Details</h2>
          <div className="mb-2">
            <label htmlFor="">Enrollment Number</label>
            <input
              type="text"
              placeholder="Enter Enrollment Number"
              className="form-control"
              value={values.enrollment_number}
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
              value={values.student_first_name}
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
              value={values.student_last_Name}
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
              value={values.phone_number}
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
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
