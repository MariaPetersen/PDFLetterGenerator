import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AppDrawer from "../../components/Drawer/AppDrawer";
import { Grid, Box, Stack } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import { PageProvider } from "../../contexts/PageContext";
import { AuthProvider } from "../../contexts/AuthContext";
import "./styles.scss"

function Layout() {
  const { authenticated } = useContext(AuthContext);
  return (
    <AuthProvider>
      <PageProvider>
        <Outlet />
              {authenticated ? (
                <Navigate to="/generatepdf" />
                ) : (
                  <Navigate to="/login" />
                  )}
      </PageProvider>
    </AuthProvider>
  );
}

export default Layout;
