import React from "react";
import { Sidebar } from "../components/admin/sidebar";
import { Outlet } from "react-router";
import { ClientStoreLayout } from "./client-store-layout";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ClientStoreLayout>
        <Outlet />
      </ClientStoreLayout>
    </div>
  );
};

export { Layout };
