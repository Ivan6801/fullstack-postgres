import React from "react";
import { useLocation } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function ClientStoreLayout({ children }) {
  const location = useLocation();
  const pathname = location.pathname;

  return !pathname.includes("login") && !pathname.includes("signup") ? (
    <div className="flex flex-col min-h-[100vh]">
      <Navbar />
      <main className="flex-1 min-h-[100vh]">{children}</main>
      <Footer />
    </div>
  ) : (
    children
  );
}
