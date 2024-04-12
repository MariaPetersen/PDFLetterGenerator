import { useEffect, useState, useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import LetterForm from "../../components/LetterForm/LetterForm";
import SelectInput from "./../../components/GeneralComponents/SelectInput";
import { templates } from "../../constants/templateOptions";
import ResignationLetterForm from "../../components/ResignationLetterForm/ResignationLetterForm";
import { useParams } from "react-router-dom";
import Api from "../../services/Api";
import { IHistory } from "../../interfaces/IHistory";

type Props = {
  free?: boolean
}

function PDFTemplates({free} : Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [pdfData, setPdfData] = useState("");
  const { id } = useParams();
  const api = useMemo(() => new Api(), []);

  useEffect(() => {
    if (id) {
      api
        .getPdfById(id)
        .then((response: Response) => response.json())
        .then((data: IHistory) => {
          setSelectedTemplate(data.type);
          setPdfData(data.pdf_data);
        });
    }
  }, [id, api]);

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      {/* <Grid item xs={10} mb={4}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          className="letter__header"
        >
          Générez un pdf de votre lettre
        </Typography>
      </Grid> */}
      <Grid item xs={4}>
        <Typography component="span">Choississez votre modèle : </Typography>
        <SelectInput
          inputLabel="Type de document"
          onChange={(value) => setSelectedTemplate(value)}
          options={templates}
        />
      </Grid>
      {selectedTemplate === "formalLetter" && (
        <Grid item xs={10}>
          <LetterForm selectedTemplate={selectedTemplate} pdfData={pdfData} free={free}/>
        </Grid>
      )}
      {selectedTemplate === "resignationLetter" && (
        <Grid item xs={10}>
          <ResignationLetterForm
            selectedTemplate={selectedTemplate}
            pdfData={pdfData}
            free={free}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default PDFTemplates;
