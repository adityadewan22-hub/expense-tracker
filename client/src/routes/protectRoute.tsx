import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

function ProtectRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectRoute;
