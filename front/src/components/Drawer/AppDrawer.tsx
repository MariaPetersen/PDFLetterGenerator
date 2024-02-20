import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function AppDrawer() {
  const drawerWidth = 200;
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          backgroundColor: "#C5C9D3",
          fontFamily: "Roboto",
        },
      }}
      open
      anchor="right"
    >
      <Typography variant="h5" align="center" mt={2}>
        Menu
      </Typography>
      {!authenticated ? (
        <List>
          <ListItem>
            <ListItemButton onClick={() => navigate("/login")}>
              Connectez-vous
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate("/signup")}>
              Inscrivez-vous
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem>
            <ListItemButton onClick={() => navigate("/generatepdf")}>
              Générer un PDF
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate("/history")}>
              Mon historique
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleLogout}>Déconnexion</ListItemButton>
          </ListItem>
        </List>
      )}
    </Drawer>
  );
}

export default AppDrawer;
