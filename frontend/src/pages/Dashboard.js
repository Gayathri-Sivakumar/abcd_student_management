import React, { useEffect, useState, useContext } from "react";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";
import { Typography, Alert } from "@mui/material";
import AuthContext from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/students", {
          headers: {
            Authorization: token,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching students", error);
        setError("An error occurred. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/students/${studentToDelete}`);
      setData(data.filter((student) => student.id !== studentToDelete));
      setShowModal(false);
      setMessage("Student deleted successfully.");
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Error deleting student", err);
      setError("An error occurred. Please try again later.");
    }
  };

  const confirmDelete = (studentId) => {
    setStudentToDelete(studentId);
    setShowModal(true);
  };

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="container">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <Typography variant="h5">Welcome!</Typography>
            <Typography variant="h6" className="text-center">
              Student Dashboard
            </Typography>
            <Button onClick={handleLogout} variant="danger">
              Logout
            </Button>
          </div>
          <div className="card-body">
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <div className="d-flex justify-content-end mb-3">
              <Link to="/add" className="btn btn-success">
                Add Student
              </Link>
            </div>
            {data.length === 0 ? (
              <p className="text-center">No students found.</p>
            ) : (
              <div
                className={`table-responsive ${
                  data.length > 8 ? "scrollable" : ""
                }`}
              >
                <Table hover>
                  <thead className="table-primary">
                    <tr>
                      <th>ID</th>
                      <th>Enrollment No</th>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((student) => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.enrollment_number}</td>
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
                          <Button
                            onClick={() => confirmDelete(student.id)}
                            variant="danger"
                            size="sm"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
