import { Grid } from "@mui/material";
import "./styles.scss"
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
    children?: React.ReactNode,
    title?: string
};

function Page({children, title}: Props) {
    const navigate = useNavigate();
    const {authenticated, setAuthenticated} = useContext(AuthContext)

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuthenticated(false);
        navigate("/login");
    };
  return (
    <Grid container sx={{m: 0, padding: 0, width: "100%", height:"100vh" }} flexDirection={{xs: "row"}}>
        <Grid item container justifyContent="center" alignItems="center" xs={12} lg={6} sx={{height:{xs: "80%", lg: "auto"}}}>
            {children}
        </Grid>
        <Grid item container flexDirection="column" alignItems="center" xs={12} lg={6} sx={{backgroundColor: "#473FAA", color: "white", fontSize: {xs: "20px", lg: "70px"}, fontFamily: "Kavoon", padding: "20px", textAlign: "center"}}>
            {!authenticated ? <Grid item container justifyContent="space-around" sx={{ fontSize:{xs: "12px", lg: "20px"}, height:{xs: "20px", lg: "200px"} }}>
                <span onClick={() => navigate("/login")}>Connectez-vous</span>
                <span onClick={() => navigate("/signup")}>Créez un compte</span>
            </Grid> : <Grid item container justifyContent="space-around" sx={{ fontSize:{xs: "10px", lg: "20px"}, height:{xs: "20px", lg: "200px"} }}>
                <span onClick={() => navigate("/generatepdf")}>Générez un PDF</span>
                <span onClick={() => navigate("/history")}>Historique</span>
                <span onClick={handleLogout}>Déconnexion</span>
            </Grid>
            
            }
            <Grid item>
                {title}
            </Grid>
        </Grid>
    </Grid>
  );
}

export default Page;
