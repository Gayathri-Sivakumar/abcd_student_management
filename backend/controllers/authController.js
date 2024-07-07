const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const Staff = require("../models/Staff");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const staff = await Staff.findOne({ where: { email } });
    if (!staff) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, staff.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: staff.id, email: staff.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const staff = await Staff.create({ email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully", staff });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  login,
  signup,
};
