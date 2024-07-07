const express = require("express");
const cors = require("cors");

const app = express();
const port = 8081;

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

app.use(cors({ origin: "http://localhost:8081" }));
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
