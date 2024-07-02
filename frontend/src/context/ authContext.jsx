import { createContext, useState, useEffect } from "react";
import { API_URL } from "../services/api";

export const LoginUserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);

  const createLoginUser = (data) => API_URL.post("/api/v1/users", data);

  return (
    <LoginUserContext.Provider value={{ createLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
