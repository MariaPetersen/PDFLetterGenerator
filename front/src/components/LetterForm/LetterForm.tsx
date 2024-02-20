import { FormEvent, useEffect, useState } from "react";
import AddressComponent from "./../AddressComponent/AddressComponent";
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
import Api from "../../services/Api";
import SelectInput from "../GeneralComponents/SelectInput";
import { greetings } from "../../constants/greetingOptions";
import { IFormalLetter } from "../../interfaces/IFormalLetter";
import { initialAddress } from "../../constants/initialStates";
import { ILetterData } from "../../interfaces/ILetterData";
import { useParams } from "react-router-dom";

type Props = {
  selectedTemplate: string;
  pdfData: string;
};

function LetterForm({ selectedTemplate, pdfData }: Props) {
  const [sender, setSender] = useState<IAddress>(initialAddress);
  const [receiver, setReceiver] = useState<IAddress>(initialAddress);

  const [letterParagraphs, setLetterParagraps] = useState<Array<string>>([]);
  const [object, setObject] = useState<string>("");
  const [textContent, setTextContent] = useState<string>("");
  const [selectedGreeting, setSelectedGreeting] = useState<string>("");
  const [pdfURL, setPdfURL] = useState<string>();
  const [saving, setSaving] = useState<boolean>(false);
  const { id } = useParams();
  const api = new Api();

  useEffect(() => {
    if (pdfData) {
      const pdfObject: IFormalLetter = JSON.parse(pdfData);
      const allTextContent = pdfObject.paragraphs.join("\n");
      console.log(allTextContent);
      pdfObject.sender && setSender(pdfObject.sender);
      pdfObject.receiver && setReceiver(pdfObject.receiver);
      pdfObject.object && setObject(pdfObject.object);
      pdfObject.paragraphs && setTextContent(allTextContent);
      pdfObject.greeting && setSelectedGreeting(pdfObject.greeting);
    }
  }, [pdfData]);

  useEffect(() => {
    if (textContent) {
      const textArray: Array<string> = textContent.split("\n");
      setLetterParagraps([...textArray]);
    }
  }, [textContent]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const letterData: IFormalLetter = {
      sender,
      receiver,
      object,
      paragraphs: letterParagraphs,
      greeting: selectedGreeting,
      type: selectedTemplate,
    };
    console.log(id);
    if (!id) {
      api
        .generateLetterPDF(letterData)
        .then((response) => {
          response.blob().then((blob) => {
            const fileURL = window.URL.createObjectURL(blob);
            setPdfURL(fileURL);
          });
        })
        .finally(() => {
          setSender(initialAddress);
          setReceiver(initialAddress);
          setObject("");
          setTextContent("");
          setSelectedGreeting("");
          setSaving(false);
        });
    } else {
      api
        .generateUpdatedPDF(letterData, id)
        .then((response: Response) => {
          response.blob().then((blob) => {
            const fileURL = window.URL.createObjectURL(blob);
            setPdfURL(fileURL);
          });
        })
        .finally(() => {
          setSender(initialAddress);
          setReceiver(initialAddress);
          setObject("");
          setTextContent("");
          setSelectedGreeting("");
          setSaving(false);
        });
    }
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
              <SelectInput
                onChange={(value) => {
                  setSelectedGreeting(value);
                }}
                options={greetings}
                inputLabel="Choississez une formule de politesse"
                initialValue={selectedGreeting}
              />
            </Grid>
            <Grid
              item
              xs={10}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="submit" variant="outlined" disabled={saving}>
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
