import { FormEvent, useEffect, useState } from "react";
import AddressComponent from "./../AddressComponent/AddressComponent";
import "./styles.scss";
import { IAddress } from "../../interfaces/IAddress";
import ILetterData from "../../interfaces/ILetterData";
import Api from "../../services/Api";

function LetterForm() {
  const [sender, setSender] = useState<IAddress>({
    firstName: "",
    lastName: "",
    street: "",
    zip: "",
    town: "",
    country: "",
  });
  const [receiver, setReceiver] = useState<IAddress>({
    firstName: "",
    lastName: "",
    street: "",
    zip: "",
    town: "",
    country: "",
  });

  const [letterParagraphs, setLetterParagraps] = useState<Array<string>>([]);
  const [textContent, setTextContent] = useState<string>();
  const api = new Api();

  useEffect(() => {
    if (textContent) {
      const textArray: Array<string> = textContent.split("\n");
      setLetterParagraps([...textArray]);
    }
  }, [textContent]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const letterData: ILetterData = {
      sender,
      receiver,
      paragraphs: letterParagraphs,
    };
    api.generateLetterPDF(letterData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="address__container">
          <div>
            <h3>Informations de l'expéditeur</h3>
            <AddressComponent address={sender} setAddress={setSender} />
          </div>
          <div>
            <h3>Informations du déstinataire</h3>
            <AddressComponent address={receiver} setAddress={setReceiver} />
          </div>
        </div>
        <div className="letterContent__container">
          <h3>Corps de la lettre</h3>
          <textarea
            name="content"
            id="content"
            className="letterContent__textarea"
            rows={20}
            value={textContent}
            onChange={(e) => {
              setTextContent(e.target.value);
            }}
          ></textarea>
        </div>
        {/* Select greeting */}
        <div>
          <button type="submit">Envoyer</button>
        </div>
      </form>
    </div>
  );
}

export default LetterForm;
