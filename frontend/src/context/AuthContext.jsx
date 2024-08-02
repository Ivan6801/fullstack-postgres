import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    }
  }, [token]);

  const login = async (email, password, rememberMe) => {
    try {
      const response = await API_URL.post("/users/login", { email, password });

      if (response.data.token) {
        if (!rememberMe) {
          localStorage.setItem("token", response.data.token);
          sessionStorage.removeItem("token");
        } else {
          sessionStorage.setItem("token", response.data.token);
          localStorage.removeItem("token");
        }
        setToken(response.data.token);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        throw new Error("Login failed: No token returned");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed: " + (error.message || "An error occurred"));
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};