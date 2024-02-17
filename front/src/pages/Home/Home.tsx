import React, { useContext } from "react";
import LetterForm from "../../components/LetterForm/LetterForm";
import { Outlet } from "react-router-dom";
import AppDrawer from "../../components/Drawer/AppDrawer";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  Stack,
} from "@mui/material";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { AuthProvider } from "../../utils/contexts/AuthContext";

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
          <Typography
            variant="h2"
            component="h1"
            align="center"
            className="letter__header"
          >
            Créez votre lettre
          </Typography>
          <Outlet />
          {/* <LetterForm /> */}
        </Box>
      </AuthProvider>
    </Stack>
  );
}

export default Home;
