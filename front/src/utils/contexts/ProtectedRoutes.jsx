import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const { authenticated } = useContext(AuthContext);
  return authenticated ? <Outlet /> : <Navigate to="/" />;
}
