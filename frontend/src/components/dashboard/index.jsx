import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
