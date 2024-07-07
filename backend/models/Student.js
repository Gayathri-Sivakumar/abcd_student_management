const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Student = sequelize.define("Student", {
  enrollment_number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 6], // Validate length
    },
  },
  student_first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  student_last_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 10], // Validate length
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Validate email format
    },
  },
});

module.exports = Student;
