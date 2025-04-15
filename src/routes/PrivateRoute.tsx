import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import { ReactNode } from "react";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const user = useAuth();
  return user ? <>{children}</> : <Navigate to="/signin" />;
};
