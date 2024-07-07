import React, { useState, useEffect, useContext } from "react";
import axios from "../utils/axios";
import StudentForm from "../components/StudentForm";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await axios.get("/students");
      setStudents(data);
    };

    if (auth) fetchStudents();
  }, [auth]);

  const handleAddStudent = async (values, { resetForm }) => {
    if (editingStudent) {
      await axios.put(`/students/${editingStudent.id}`, values);
      setEditingStudent(null);
    } else {
      await axios.post("/students", values);
    }
    const { data } = await axios.get("/students");
    setStudents(data);
    resetForm();
  };

  const handleDeleteStudent = async (id) => {
    await axios.delete(`/students/${id}`);
    const { data } = await axios.get("/students");
    setStudents(data);
  };

  return (
    <Container>
      <Box my={4}>
        <StudentForm
          initialValues={editingStudent || { name: "", email: "", phone: "" }}
          onSubmit={handleAddStudent}
        />
      </Box>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setEditingStudent(student)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteStudent(student.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Students;
