import { FormEvent, useEffect, useState } from "react";
import AddressComponent from "./../AddressComponent/AddressComponent";
import "./styles.scss";
import {
  Grid,
  Button,
  TextField,
  Card,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";
import { IAddress } from "../../interfaces/IAddress";
import ILetterData from "../../interfaces/ILetterData";
import Api from "../../services/Api";
import SelectGreetingsComponent from "../SelectGreetingsComponent/SelectGreetingsComponent";

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
  const [object, setObject] = useState<string>("");
  const [textContent, setTextContent] = useState<string>("");
  const [selectedGreeting, setSelectedGreeting] = useState<string>("");
  const [pdfURL, setPdfURL] = useState<string>();
  const api = new Api();

  useEffect(() => {
    if (textContent) {
      const textArray: Array<string> = textContent.split("\n");
      setLetterParagraps([...textArray]);
    }
  }, [textContent]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const letterData: ILetterData = {
      sender,
      receiver,
      object,
      paragraphs: letterParagraphs,
      greeting: selectedGreeting,
    };
    api.generateLetterPDF(letterData).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        setPdfURL(fileURL);
      });
    });
  }

  return (
    <div>
      {pdfURL ? (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={10}>
            <Button variant="outlined" onClick={() => setPdfURL("")}>
              Retour au formulaire
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="iframe"
                height="140"
                src={pdfURL}
                sx={{ height: "100vh" }}
              />
            </Card>
          </Grid>
        </Grid>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={4}>
              <Stack spacing={2}>
                <Typography variant="h5">
                  Informations de l'expéditeur
                </Typography>
                <AddressComponent address={sender} setAddress={setSender} />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={2}>
                <Typography variant="h5">
                  Informations du déstinataire
                </Typography>
                <AddressComponent address={receiver} setAddress={setReceiver} />
              </Stack>
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Object"
                value={object}
                onChange={(e) => {
                  setObject(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={10}>
              <Stack spacing={2}>
                <Typography variant="h5">Corps de la lettre</Typography>
                <TextField
                  label="Corps du texte"
                  multiline
                  rows={10}
                  value={textContent}
                  onChange={(e) => {
                    setTextContent(e.target.value);
                  }}
                  sx={{ width: "100%" }}
                />
              </Stack>
            </Grid>
            <Grid item xs={10}>
              <SelectGreetingsComponent
                selectedGreeting={selectedGreeting}
                setSelectedGreeting={setSelectedGreeting}
              />
            </Grid>
            <Grid item xs={10}>
              <Button type="submit" variant="outlined">
                Envoyer
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
}

export default LetterForm;
