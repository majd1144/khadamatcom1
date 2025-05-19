import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const role = localStorage.getItem("userRole");

  if (role === "admin") {
    return <Outlet />; // ✅ خليه يكمل داخل AdminLayout الموجود في routes
  } else {
    return <Navigate to="/not-authorized" />; // ❌ مش أدمن؟ برا
  }
};

export default AdminRoute;
