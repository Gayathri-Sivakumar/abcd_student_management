import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function View() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/get/${id}`)
      .then((res) => {
        console.log(res);
        setStudent(res.data); // Assuming your API response returns an array with one student object
      })
      .catch((err) => console.error(err));
  }, [id]);
  if (student === null) {
    return (
      <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
        <div>student data is null</div>
      </div>
    );
  }

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      {!student ? (
        <div>
          {/* Display loading indicator or message */}
          Loading student data...
        </div>
      ) : (
        <div className="w-50 bg white rounded p-3">
          <div className="p-2">
            <h2>Student Details</h2>
            <h3>ID: {student.id}</h3>
            <h3>Enrollment Number: {student.enrollment_number}</h3>
            <h3>First Name: {student.student_first_name}</h3>
            <h3>Last Name: {student.student_last_Name}</h3>
            <h3>Phone Number: {student.phone_number}</h3>
            <h3>Email: {student.email}</h3>
          </div>
          <Link to="/dashboard" className="btn btn-primary me-2">
            Back
          </Link>
          <Link
            to={`/edit/${student.id}`}
            className="btn btn-sm btn-primary mx-2"
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}

export default View;
