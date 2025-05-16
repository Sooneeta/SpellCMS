import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-12">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
