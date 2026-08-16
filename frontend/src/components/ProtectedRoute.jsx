import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const getStoredSession = () => {
  try {
    // const token = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : null;

    return {
      // token,
      user,
      // isAuthenticated: Boolean(token && user),
      isAuthenticated: Boolean(user),
    };
  } catch (error) {
    console.error("Failed to parse auth session", error);
    return {
      // token: null,
      user: null,
      isAuthenticated: false,
    };
  }
};

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const location = useLocation();
  const { isAuthenticated, user } = getStoredSession();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    const fallbackRoute =
      user?.role === "admin"
        ? "/admin"
        : user?.role === "customer"
          ? "/customer"
          : "/login";

    return <Navigate to={fallbackRoute} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
