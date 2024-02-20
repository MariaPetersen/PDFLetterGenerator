import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Typography } from "@mui/material";
import Api from "../../services/Api";

type LoginAndSignupFormProps = {
  type: "login" | "signup";
};

const LoginAndSignupForm = ({ type }: LoginAndSignupFormProps) => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [couldNotLogIn, setCouldNotLogin] = useState(false);
  const navigate = useNavigate();
  const api = new Api();

  const handleLogin = async () => {
    api
      .loginUser(email, password)
      .then((response) => response.json())
      .then((data) => {
        const { token, userId } = data;
        if (token && userId) {
          localStorage.setItem("token", token);
          setAuthenticated(true);
          setCouldNotLogin(false);
        } else {
          setCouldNotLogin(true);
        }
      })
      .catch(console.error);
  };

  const handleSignup = () => {
    api
      .signUpUser(email, password)
      .then((response) => response.json())
      .then((data) => {
        const { token, userId } = data;
        if (token && userId) {
          localStorage.setItem("token", token);
          setAuthenticated(true);
          setCouldNotLogin(false);
        } else {
          setCouldNotLogin(true);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (authenticated) navigate("/generatepdf");
  }, [authenticated, navigate]);

  return (
    <Grid container flexDirection="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h4">
          {type === "login"
            ? "Connectez vous à votre compte"
            : "Créer un compte"}
        </Typography>
      </Grid>
      <Grid item mt={10}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Mail"
          type="text"
        />
      </Grid>
      <Grid item>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Mot de passe"
          type="password"
        />
      </Grid>
      {type === "login" && (
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Button onClick={handleLogin}>Connectez vous</Button>
          <Typography onClick={() => navigate("/signup")}>
            Vous n'avez pas encore de compte ? Cliquez ici
          </Typography>
          {couldNotLogIn && (
            <Typography
              sx={{ color: "red" }}
              onClick={() => navigate("/signup")}
            >
              L'authentification a échoué
            </Typography>
          )}
        </Grid>
      )}
      {type === "signup" && (
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Button onClick={handleSignup}>Inscrivez vous</Button>
          <Typography onClick={() => navigate("/login")}>
            Vous avez déjà un compte ? Connectez-vous ici
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default LoginAndSignupForm;
