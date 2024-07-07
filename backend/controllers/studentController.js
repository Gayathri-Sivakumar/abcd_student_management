const { executeQuery } = require("../models/db");

const createStudent = async (req, res) => {
  try {
    const {
      enrollment_number,
      student_first_name,
      student_last_Name,
      phone_number,
      email,
    } = req.body;

    if (enrollment_number.length !== 6 || phone_number.length !== 10) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const sql = `
      INSERT INTO student (enrollment_number, student_first_name, student_last_Name, phone_number, email)
      VALUES (?, ?, ?, ?, ?)`;
    const params = [
      enrollment_number,
      student_first_name,
      student_last_Name,
      phone_number,
      email,
    ];

    await executeQuery(sql, params);
    res.status(201).json({ message: "Student created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating student" });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const sql = `SELECT * FROM student`;
    const students = await executeQuery(sql);
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
};

const getStudentById = async (req, res) => {
  try {
    const sql = `SELECT * FROM student WHERE id = ?`;
    const student = await executeQuery(sql, [req.params.id]);

    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      enrollment_number,
      student_first_name,
      student_last_Name,
      phone_number,
      email,
    } = req.body;

    const sql = `
      UPDATE student SET
        enrollment_number = ?,
        student_first_name = ?,
        student_last_Name = ?,
        phone_number = ?,
        email = ?
      WHERE id = ?`;
    const params = [
      enrollment_number,
      student_first_name,
      student_last_Name,
      phone_number,
      email,
      id,
    ];

    await executeQuery(sql, params);
    res.json({ message: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating student" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const sql = `DELETE FROM student WHERE id = ?`;
    await executeQuery(sql, [req.params.id]);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
