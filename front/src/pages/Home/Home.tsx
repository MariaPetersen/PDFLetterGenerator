import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AppDrawer from "../../components/Drawer/AppDrawer";
import { Typography, Box, Stack } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthProvider } from "../../contexts/AuthContext";

function Home() {
  const drawerWidth = 200;
  const { authenticated } = useContext(AuthContext);
  return (
    <Stack>
      <AuthProvider>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <AppDrawer />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Outlet />

          {authenticated ? (
            <Navigate to="/generatepdf" />
          ) : (
            <Navigate to="/login" />
          )}
        </Box>
      </AuthProvider>
    </Stack>
  );
}

export default Home;
