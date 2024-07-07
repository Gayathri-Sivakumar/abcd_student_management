// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      setAuth(token);
    }
  }, []);

  const login = async (username, password) => {
    const { data } = await axios.post("/auth/login", { username, password });
    localStorage.setItem("token", data.token);
    axios.defaults.headers.common["x-auth-token"] = data.token;
    setAuth(data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth, AuthContext };
