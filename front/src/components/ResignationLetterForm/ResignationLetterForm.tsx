import { FormEvent, useState, useEffect } from "react";
import AddressComponent from "./../AddressComponent/AddressComponent";
import {
  Grid,
  Button,
  TextField,
  Card,
  CardMedia,
  Typography,
  Stack,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IAddress } from "../../interfaces/IAddress";
import Api from "../../services/Api";
import SelectInput from "../GeneralComponents/SelectInput";
import { IResignationLetter } from "../../interfaces/IResignationLetter";
import { handInTypes } from "../../constants/handInTypes";
import { genders } from "../../constants/genderOptions";
import {
  initialAddress,
  initialResignationLetterData,
} from "./../../constants/initialStates";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

type Props = {
  selectedTemplate: string;
  pdfData: string;
  free?: boolean;
};

function ResignationLetterForm({ selectedTemplate, pdfData, free }: Props) {
  const [sender, setSender] = useState<IAddress>(initialAddress);
  const [receiver, setReceiver] = useState<IAddress>(initialAddress);
  const [saving, setSaving] = useState<boolean>(false);
  const { id } = useParams();

  const [resignationLetterData, setResignationLetterData] =
    useState<IResignationLetter>(initialResignationLetterData);

  const [pdfURL, setPdfURL] = useState<string>();
  const api = new Api();

  useEffect(() => {
    if (pdfData) {
      const pdfObject: IResignationLetter = JSON.parse(pdfData);
      pdfObject.sender && setSender(pdfObject.sender);
      pdfObject.receiver && setReceiver(pdfObject.receiver);
      pdfObject.handInType &&
        setResignationLetterData({
          ...resignationLetterData,
          handInType: pdfObject.handInType,
        });
      pdfObject.receiverGender &&
        setResignationLetterData({
          ...resignationLetterData,
          receiverGender: pdfObject.receiverGender,
        });
      pdfObject.jobFunction &&
        setResignationLetterData({
          ...resignationLetterData,
          jobFunction: pdfObject.jobFunction,
        });
      pdfObject.startOfContract &&
        setResignationLetterData({
          ...resignationLetterData,
          startOfContract: dayjs(pdfObject.startOfContract),
        });
      pdfObject.notice &&
        setResignationLetterData({
          ...resignationLetterData,
          notice: pdfObject.notice,
        });
      pdfObject.dispenseNotice &&
        setResignationLetterData({
          ...resignationLetterData,
          dispenseNotice: pdfObject.dispenseNotice,
        });
    }
  }, [pdfData]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const letterData: IResignationLetter = {
      sender,
      receiver,
      type: selectedTemplate,
      handInType: resignationLetterData.handInType,
      receiverGender: resignationLetterData.receiverGender,
      jobFunction: resignationLetterData.jobFunction,
      startOfContract: dayjs(resignationLetterData.startOfContract).add(
        1,
        "day"
      ),
      notice: resignationLetterData.notice,
      dispenseNotice: resignationLetterData.dispenseNotice,
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
          setResignationLetterData(initialResignationLetterData);
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
          setResignationLetterData(initialResignationLetterData);
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
            <Grid item xs={5}>
              <SelectInput
                onChange={(value) => {
                  setResignationLetterData({
                    ...resignationLetterData,
                    handInType: value,
                  });
                }}
                options={handInTypes}
                inputLabel="Type de remise"
                initialValue={resignationLetterData.handInType}
              />
            </Grid>
            <Grid item xs={5}>
              <SelectInput
                onChange={(value) => {
                  setResignationLetterData({
                    ...resignationLetterData,
                    receiverGender: value,
                  });
                }}
                options={genders}
                inputLabel="Genre du destinataire"
                initialValue={resignationLetterData.receiverGender}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Fonction occupée"
                value={resignationLetterData.jobFunction}
                onChange={(e) => {
                  setResignationLetterData({
                    ...resignationLetterData,
                    jobFunction: e.target.value,
                  });
                }}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={5}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="fr"
              >
                <DatePicker
                  label="Début du contrat"
                  value={dayjs(resignationLetterData.startOfContract)}
                  onChange={(value) => {
                    setResignationLetterData({
                      ...resignationLetterData,
                      startOfContract: value,
                    });
                  }}
                  format="DD/MM/YYYY"
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Période de préavis"
                value={resignationLetterData.notice}
                onChange={(e) => {
                  setResignationLetterData({
                    ...resignationLetterData,
                    notice: e.target.value,
                  });
                }}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={5}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={(e) => {
                      setResignationLetterData({
                        ...resignationLetterData,
                        dispenseNotice: !resignationLetterData.dispenseNotice,
                      });
                    }}
                    checked={resignationLetterData.dispenseNotice}
                  />
                }
                label="Demander une dispense du préavis ?"
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

export default ResignationLetterForm;
