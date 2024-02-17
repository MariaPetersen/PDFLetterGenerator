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

const History = () => {
  const [history, setHistory] = useState<Array<IHistory>>();
  const [pdfURL, setPdfURL] = useState<string>();
  const api = useMemo(() => new Api(), []);

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
    api
      .deleteHistory(pdfId)
      .then(() => {
        console.log("Histroy deleted");
      })
      .catch((e) => console.error(e));
  };

  const handleRegenratePdf = (pdfId: string) => {
    if (history) {
      const pdfToGenerate = history.find((pdf) => pdf.pdf_id === pdfId);
      const letterData = pdfToGenerate && pdfToGenerate.pdf_data;
      const formattedData = letterData && JSON.parse(letterData);
      api.generateLetterPDF(formattedData).then((response) => {
        response.blob().then((blob) => {
          const fileURL = window.URL.createObjectURL(blob);
          setPdfURL(fileURL);
        });
      });
    }
  };

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
        <Grid
          container
          spacing={2}
          flexDirection="column"
          alignItems="center"
          mt={6}
        >
          {history &&
            history?.map((element) => (
              <Grid item key={element.pdf_id}>
                <Card variant="outlined" sx={{ width: "300px" }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {`PDF créé le : ${new Date(
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
                    >
                      Regénérer
                    </Button>
                    <Button
                      onClick={() => {
                        handleDeleteHistory(element.pdf_id);
                      }}
                      size="small"
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
};

export default History;
