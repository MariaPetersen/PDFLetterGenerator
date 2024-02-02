import React from "react";
import LetterForm from "../../components/LetterForm/LetterForm";

function Home() {
  return (
    <div className="Home">
      <h2 className="letter__header">Créez votre lettre</h2>
      <LetterForm />
    </div>
  );
}

export default Home;
