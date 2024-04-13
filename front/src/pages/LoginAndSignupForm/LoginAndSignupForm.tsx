import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Typography } from "@mui/material";
import Api from "../../services/Api";
import Page from "../../components/Page/Page";
import { PageContext } from "../../contexts/PageContext";

type LoginAndSignupFormProps = {
  type: "login" | "signup";
};

const LoginAndSignupForm = ({ type }: LoginAndSignupFormProps) => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [couldNotLogIn, setCouldNotLogin] = useState(false);
  const [loading, setLoading] = useState(false)
  const {title, setTitle} = useContext(PageContext)
  const navigate = useNavigate();
  const api = new Api();

  const handleLogin = async () => {
    setLoading(true);
    api
      .loginUser(email, password)
      .then((response) => response.json())
      .then((data) => {
        const { token, userId } = data;
        if (token && userId) {
          localStorage.setItem("token", token);
          setAuthenticated(true);
          setCouldNotLogin(false);
          setLoading(false);
        } else {
          setCouldNotLogin(true);
          setLoading(false);
        }
      })
      .catch(console.error);
  };

  const handleSignup = () => {
    setLoading(true);
    api
      .signUpUser(email, password)
      .then((response) => response.json())
      .then((data) => {
        const { token, userId } = data;
        if (token && userId) {
          localStorage.setItem("token", token);
          setAuthenticated(true);
          setCouldNotLogin(false);
          setLoading(false);
        } else {
          setCouldNotLogin(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (authenticated) navigate("/generatepdf");
  }, [authenticated, navigate]);

  useEffect(() => {
    setTitle("Générez une lettre en PDF avec une mise en forme automatique !")
  }, []);

  return (
    <Page title={title}>
      <Grid container flexDirection="row">
        <Grid item container flexDirection="column" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5" sx={{textAlign: "center"}}>
              {type === "login"
                ? "Connectez-vous à votre compte pour garder un historique"
                : "Créez un compte pour garder un historique de vos PDFs"}
            </Typography>
            {type === "login" && <Typography onClick={() => navigate("/freepdfgenerator")} sx={{textAlign: "center", '&:hover': {
              cursor: "pointer", textDecoration: "underline"
            }}}>
              Ou formatez votre lettre sans vous connecter en cliquant ici
            </Typography>}
          </Grid>
          <Grid item mt={4}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Mail"
              type="text"
              sx={{ width: '300px'}}
              />
          </Grid>
          <Grid item>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Mot de passe"
              type="password"
              sx={{ width: '300px'}}
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
              <Button onClick={handleLogin} disabled={loading}>Connectez vous</Button>
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
              <Button onClick={handleSignup} disabled={loading}>Inscrivez vous</Button>
              <Typography onClick={() => navigate("/login")}>
                Vous avez déjà un compte ? Connectez-vous ici
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Page>
  );
};

export default LoginAndSignupForm;
