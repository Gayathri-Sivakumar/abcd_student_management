import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GetStarted from "./pages/Getstarted/GetStarted";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import View from "./pages/Views";
import Edit from "./pages/Edit";
// import Delete from "./Delete";
import Add from "./pages/Add";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetStarted />} exact />
        <Route path="login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<Add />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/edit/:id" element={<Edit />} />
        {/* <Route path="/delete/:id" element={<Delete />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
