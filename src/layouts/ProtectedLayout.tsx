import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
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
