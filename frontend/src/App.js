import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GetStarted from "./pages/Getstarted/GetStarted";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import View from "./pages/Views";
import Edit from "./pages/Edit";
import Add from "./pages/Add";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={Dashboard} />}
          />
          <Route path="/add" element={<PrivateRoute element={Add} />} />
          <Route path="/view/:id" element={<PrivateRoute element={View} />} />
          <Route path="/edit/:id" element={<PrivateRoute element={Edit} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
