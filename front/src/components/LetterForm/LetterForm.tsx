import { FormEvent, useContext, useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { letterFormSlides, letterFormSlidesTitles } from "../../constants/letterFormSlides";
import { PageContext } from "../../contexts/PageContext";

type Props = {
  selectedTemplate: string;
  pdfData: string;
  free?: boolean;
};

function LetterForm({ selectedTemplate, pdfData, free }: Props) {
  const [sender, setSender] = useState<IAddress>(initialAddress);
  const [receiver, setReceiver] = useState<IAddress>(initialAddress);

  const [letterParagraphs, setLetterParagraps] = useState<Array<string>>([]);
  const [object, setObject] = useState<string>("");
  const [textContent, setTextContent] = useState<string>("");
  const [selectedGreeting, setSelectedGreeting] = useState<string>("");
  const [pdfURL, setPdfURL] = useState<string>();
  const [saving, setSaving] = useState<boolean>(false);
  const [currentSLide, setCurrentSlide] = useState(letterFormSlides[0])
  const [isNextSlide, setIsNextSlide] = useState(true)
  const [isFormerSlide, setIsFormerSlide] = useState(false)
  const {setTitle} = useContext(PageContext)
  const { id } = useParams();
  const api = new Api();

  useEffect(() => {
    if (pdfData) {
      const pdfObject: IFormalLetter = JSON.parse(pdfData);
      const allTextContent = pdfObject.paragraphs.join("\n");
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
    if (!id) {
      api
        .generateLetterPDF(letterData, free)
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

  const nextSlide = () => {
    if (!isFormerSlide) {setIsFormerSlide(true)}
    const index = letterFormSlides.findIndex((element) => element === currentSLide)
    const nextSlide = letterFormSlides[index + 1]
    setCurrentSlide(nextSlide)
    setTitle(letterFormSlidesTitles[nextSlide])
    if(index + 1 === letterFormSlides.length - 1) {
      setIsNextSlide(false)
    }
  }
  const formerSlide = () => {
    if (!isNextSlide) {setIsNextSlide(true)}
    const index = letterFormSlides.findIndex((element) => element === currentSLide)
    const formerSlide = letterFormSlides[index - 1]
    setCurrentSlide(formerSlide)
    setTitle(letterFormSlidesTitles[formerSlide])
    if(index - 1 === 0) {
      setIsFormerSlide(false)
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
          <Grid container spacing={4} justifyContent="center" alignItems="center">
           {currentSLide === "sender" && <Grid item xs={10}>
              <Stack spacing={2}>
                <AddressComponent address={sender} setAddress={setSender} />
              </Stack>
            </Grid>}
            {currentSLide === "receiver" && <Grid item xs={10}>
              <Stack spacing={2}>
                <AddressComponent address={receiver} setAddress={setReceiver} />
              </Stack>
            </Grid>}
            {currentSLide === "object" && <Grid item xs={10} width={{md: "400px"}}>
              <TextField
                label="Object"
                value={object}
                onChange={(e) => {
                  setObject(e.target.value);
                }}
                sx={{ width: "100%" }}
              />
            </Grid>}
            {currentSLide === "content" && <Grid item xs={10} width={{md: "400px"}}>
              <Stack spacing={2}>
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
            </Grid>}
            {currentSLide === "greeting" && <Grid item xs={10} width={{md: "400px"}}>
              <SelectInput
                onChange={(value) => {
                  setSelectedGreeting(value);
                }}
                options={greetings}
                inputLabel="Choississez une formule de politesse"
                initialValue={selectedGreeting}
              />
            </Grid>}
            {currentSLide === "greeting" &&  <Grid
              item
              xs={10}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="submit" variant="outlined" disabled={saving}>
                Envoyer
              </Button>
            </Grid>}
            <Grid item container justifyContent="space-around">
              {isFormerSlide  && <Button onClick={formerSlide}>Précédent</Button>}
              {isNextSlide  && <Button onClick={nextSlide}>Suivant</Button>}
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
}

export default LetterForm;
