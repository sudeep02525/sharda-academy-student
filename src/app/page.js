"use client";

import { useState, useEffect } from "react";
import UserLogin from "@/components/UserLogin";
import StudentDashboard from "@/components/StudentDashboard";

export default function SAMSUserPortal() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("user_token");
    const savedRole = localStorage.getItem("user_role");
    if (savedToken) {
      setToken(savedToken);
      setRole(savedRole || "");
    }
  }, []);

  const handleAuthSuccess = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    setToken("");
    setRole("");
  };

  // Render Student Dashboard if authenticated
  if (token) {
    return <StudentDashboard token={token} onLogout={handleLogout} />;
  }

  // Otherwise, render the Login/Registration page directly
  return <UserLogin onAuthSuccess={handleAuthSuccess} />;
}
