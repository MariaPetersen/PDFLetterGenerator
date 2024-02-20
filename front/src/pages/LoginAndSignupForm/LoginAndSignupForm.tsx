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
  const navigate = useNavigate();
  const api = new Api();

  const handleLogin = async () => {
    api
      .loginUser(email, password)
      .then((response) => response.json())
      .then((data) => {
        const { token } = data;
        localStorage.setItem("token", token);
        setAuthenticated(true);
      })
      .catch(console.error);
  };

  const handleSignup = () => {
    api
      .signUpUser(email, password)
      .then((response) => response.json())
      .then((data) => {
        const { token } = data;
        localStorage.setItem("token", token);
        setAuthenticated(true);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (authenticated) navigate("/generatepdf");
  }, [authenticated, navigate]);

  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      spacing={2}
      mt={6}
    >
      <Grid item>
        <Typography variant="h4">
          {type === "login"
            ? "Connectez vous à votre compte"
            : "Créer un compte"}
        </Typography>
      </Grid>
      <Grid item>
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
      <Grid item>
        {type === "login" && (
          <Button onClick={handleLogin}>Connectez vous</Button>
        )}
        {type === "signup" && (
          <Button onClick={handleSignup}>Inscrivez vous</Button>
        )}
      </Grid>
    </Grid>
  );
};

export default LoginAndSignupForm;
