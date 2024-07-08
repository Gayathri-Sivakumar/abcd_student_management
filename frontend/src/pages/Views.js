import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../utils/axios";
import { Alert } from "react-bootstrap";

function View() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/students/${id}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.error("Error fetching student", err);
        setError("An error occurred. Please try again later.");
      });
  }, [id]);

  if (student === null) {
    return (
      <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
        <div className="text-center shadow-sm">
          <p className="lead">Student data is loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="w-50 bg-light rounded p-3 shadow-sm">
        <div className="p-3">
          {error && <Alert variant="danger">{error}</Alert>}
          <h2 className="mb-4">Student Details</h2>
          <div className="mb-3">
            <strong>ID:</strong> {student.id}
          </div>
          <div className="mb-3">
            <strong>Enrollment Number:</strong> {student.enrollment_number}
          </div>
          <div className="mb-3">
            <strong>Name:</strong>{" "}
            {`${student.student_first_name} ${student.student_last_Name}`}
          </div>
          <div className="mb-3">
            <strong>Phone Number:</strong> {student.phone_number}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {student.email}
          </div>
        </div>
        <div className="text-end">
          <Link to="/dashboard" className="btn btn-primary me-2">
            Back
          </Link>
          <Link to={`/edit/${student.id}`} className="btn  btn-primary ml-2">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default View;
