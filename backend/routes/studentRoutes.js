const express = require("express");
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyToken, createStudent);
router.get("/", verifyToken, getAllStudents);
router.get("/:id", verifyToken, getStudentById);
router.put("/:id", verifyToken, updateStudent);
router.delete("/:id", verifyToken, deleteStudent);

module.exports = router;
