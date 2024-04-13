import { useEffect, useState, useMemo, useContext } from "react";
import { Grid, Typography } from "@mui/material";
import LetterForm from "../../components/LetterForm/LetterForm";
import SelectInput from "./../../components/GeneralComponents/SelectInput";
import { templates } from "../../constants/templateOptions";
import ResignationLetterForm from "../../components/ResignationLetterForm/ResignationLetterForm";
import { useParams } from "react-router-dom";
import Api from "../../services/Api";
import { IHistory } from "../../interfaces/IHistory";
import Page from "../../components/Page/Page";
import { PageContext } from "../../contexts/PageContext";

type Props = {
  free?: boolean
}

function PDFTemplates({free} : Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [pdfData, setPdfData] = useState("");
  const { id } = useParams();
  const api = useMemo(() => new Api(), []);
  const {title, setTitle} = useContext(PageContext)

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

  useEffect(() => {
    setTitle("Choisissez un type de lettre !")
  }, [])

  return (
    <Page title={title}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {!selectedTemplate && <Grid item xs={10} lg={4}>
          <SelectInput
            inputLabel="Type de document"
            onChange={(value) => setSelectedTemplate(value)}
            options={templates}
            />
        </Grid>}
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
    </Page>
  );
}

export default PDFTemplates;
