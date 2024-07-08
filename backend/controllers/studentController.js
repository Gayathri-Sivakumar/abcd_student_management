const Student = require("../models/Student");

async function createStudent(req, res) {
  try {
    const {
      enrollment_number,
      student_first_name,
      student_last_Name,
      phone_number,
      email,
    } = req.body;
    const staff_id = req.user.id;
    console.log(req.user.id);

    const newStudent = await Student.create({
      enrollment_number,
      student_first_name,
      student_last_Name,
      phone_number,
      email,
      StaffId: staff_id,
    });

    res
      .status(201)
      .json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Error creating student" });
  }
}

async function getAllStudents(req, res) {
  try {
    const staffId = req.user.id;
    const students = await Student.findAll({
      where: {
        staffId: staffId,
      },
    });
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
}

async function getStudentById(req, res) {
  try {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Error fetching student" });
  }
}

async function updateStudent(req, res) {
  try {
    const id = req.params.id;
    const {
      enrollment_number,
      student_first_name,
      student_last_Name,
      phone_number,
      email,
    } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const { staff_id } = req.user.id;

    await student.update({
      enrollment_number,
      student_first_name,
      student_last_Name,
      phone_number,
      email,
      StaffId: staff_id,
    });

    res.json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student" });
  }
}

async function deleteStudent(req, res) {
  try {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.destroy();
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student" });
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
