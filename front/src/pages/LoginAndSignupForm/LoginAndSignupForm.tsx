import { useContext, useState } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
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
        navigate("/generatepdf");
      })
      .then(() => {
        console.log(authenticated);
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
        navigate("/generatepdf");
      })
      .catch(console.error);
  };

  console.log(authenticated);
  return (
    <div>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Mail"
        type="text"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Mot de passe"
        type="password"
      />
      {type === "login" && (
        <Button onClick={handleLogin}>Connectez vous</Button>
      )}
      {type === "signup" && (
        <Button onClick={handleSignup}>Inscrivez vous</Button>
      )}
    </div>
  );
};

export default LoginAndSignupForm;
