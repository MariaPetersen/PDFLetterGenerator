import React from "react";
import LetterForm from "../../components/LetterForm/LetterForm";
import { Typography } from "@mui/material";

function Home() {
  return (
    <div className="Home">
      <Typography
        variant="h2"
        component="h1"
        align="center"
        className="letter__header"
      >
        Créez votre lettre
      </Typography>
      <LetterForm />
    </div>
  );
}

export default Home;
