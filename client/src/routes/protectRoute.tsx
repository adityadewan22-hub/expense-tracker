import React, { type ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  replace,
} from "react-router-dom";
import { useAuth } from "../context/authcontext";

function ProtectRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectRoute;
