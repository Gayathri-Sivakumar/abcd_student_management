const { executeQuery } = require("../models/db");
const { findUserByEmail } = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await findUserByEmail(email);

    if (users.length === 0 || users[0].password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = users[0];
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUsers = await findUserByEmail(email);

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    await createUser({ email, password, role });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { login, signup };
