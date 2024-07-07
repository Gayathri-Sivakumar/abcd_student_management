import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";

function Dashboard() {
  const { id } = useParams();
  const location = useLocation();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (studentId) => {
    axios
      .delete(`http://localhost:8081/delete/${studentId}`)
      .then((res) => {
        setData(data.filter((student) => student.id !== studentId));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-4 shadow-sm">
        <h2 className="mb-4">Student List</h2>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/add" className="btn btn-success">
            Add Student
          </Link>
        </div>
        {data.length === 0 ? (
          <p className="text-center">No students found.</p>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.student_first_name}</td>
                  <td>{student.phone_number}</td>
                  <td>
                    <Link
                      to={`/view/${student.id}`}
                      className="btn btn-sm btn-info me-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${student.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
