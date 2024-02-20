import { useEffect, useState, useMemo } from "react";
import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import Api from "../../services/Api";
import { IHistory } from "./../../interfaces/IHistory";
import { useNavigate } from "react-router-dom";

function History() {
  const [history, setHistory] = useState<Array<IHistory>>();
  const [pdfURL, setPdfURL] = useState<string>();
  const [saving, setSaving] = useState<boolean>(false);
  const api = useMemo(() => new Api(), []);
  const navigate = useNavigate();
  useEffect(() => {
    api
      .getHistory()
      .then((response: Response) => response.json())
      .then((data: Array<IHistory>) => {
        setHistory(data);
      })
      .catch((e: Error) => console.error(e));
  }, [api]);

  const handleDeleteHistory = (pdfId: string) => {
    setSaving(true);
    api
      .deleteHistory(pdfId)
      .then(() => {
        const updatedHistory = history?.filter((pdf) => pdf.pdf_id !== pdfId);
        setHistory(updatedHistory);
      })
      .catch((e) => console.error(e))
      .finally(() => setSaving(false));
  };

  const handleRegenratePdf = (pdfId: string) => {
    if (history) {
      setSaving(true);
      const pdfToGenerate = history.find((pdf) => pdf.pdf_id === pdfId);
      const letterData = pdfToGenerate && pdfToGenerate.pdf_data;
      const formattedData = letterData && JSON.parse(letterData);
      api
        .generateLetterPDF(formattedData)
        .then((response) => {
          response.blob().then((blob) => {
            const fileURL = window.URL.createObjectURL(blob);
            setPdfURL(fileURL);
          });
        })
        .finally(() => setSaving(false));
    }
  };

  const handleUpdatePdf = (pdfId: string) => {
    navigate(`/generatePdf/${pdfId}`);
  };

  return (
    <div>
      {pdfURL ? (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={10}>
            <Button variant="outlined" onClick={() => setPdfURL("")}>
              Retour à mon historique
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
        <Grid container spacing={2} flexDirection="column" alignItems="center">
          <Grid item xs={10} mb={4}>
            <Typography
              variant="h4"
              component="h2"
              align="center"
              className="letter__header"
            >
              Votre historique
            </Typography>
          </Grid>
          {history &&
            history?.map((element) => (
              <Grid item key={element.pdf_id} xs={12}>
                <Card
                  variant="outlined"
                  sx={{
                    width: "70vw",
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: "15px",
                    backgroundColor: "#f3f4f6",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {`PDF de type ${
                        element.type === "formalLetter"
                          ? '"Lettre formelle"'
                          : '"Lettre de démission"'
                      } créé le : ${new Date(
                        element.created_at
                      ).toLocaleDateString("fr-FR")}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => {
                        handleRegenratePdf(element.pdf_id);
                      }}
                      size="small"
                      disabled={saving}
                    >
                      Regénérer
                    </Button>
                    <Button
                      onClick={() => {
                        handleUpdatePdf(element.pdf_id);
                      }}
                      size="small"
                      disabled={saving}
                    >
                      Modifier
                    </Button>
                    <Button
                      onClick={() => {
                        handleDeleteHistory(element.pdf_id);
                      }}
                      size="small"
                      disabled={saving}
                    >
                      Supprimer
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
}

export default History;
