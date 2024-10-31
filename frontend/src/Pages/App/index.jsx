import React from "react";
import { ShoppingCartProvider } from "../../Context";
import { useRoutes, BrowserRouter } from "react-router-dom";
import "./App.css";

import Home from "../Home";
import Navbar from "../../Components/Navbar";

const AppRoutes = () => {
  let routes = useRoutes([{ path: "/", element: <Home /> }]);

  return routes;
};

export default function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}
