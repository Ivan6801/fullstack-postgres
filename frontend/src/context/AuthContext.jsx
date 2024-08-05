import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../services/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      setUser(null);
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
        setUser({ email });
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        throw new Error("Login failed: No token returned");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed: " + (error.message || "An error occurred"));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      setToken(user.accessToken);

      setUser({
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      toast.success("Google sign-in successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(
        "Error with Google sign-in: " + (error.message || "An error occurred")
      );
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, handleGoogleSignIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
