import { Dispatch, SetStateAction } from "react";
import { IAddress } from "../../interfaces/IAddress";
import { Stack, TextField } from "@mui/material";

type AddressComponentProps = {
  address: IAddress;
  setAddress: Dispatch<SetStateAction<IAddress>>;
};

function AddressComponent({ address, setAddress }: AddressComponentProps) {
  return (
    <Stack flexDirection="column" spacing={2}>
      <TextField
        size="small"
        label="Prénom"
        type="text"
        id="firstName"
        value={address.firstName}
        onChange={(e) => {
          setAddress({ ...address, firstName: e.target.value });
        }}
      />
      <TextField
        size="small"
        type="text"
        id="lastName"
        label="Nom de famille"
        value={address.lastName}
        onChange={(e) => {
          setAddress({ ...address, lastName: e.target.value });
        }}
      />
      <TextField
        size="small"
        label="Adresse"
        type="text"
        id="street"
        placeholder="31 rue Mouffetard"
        value={address.street}
        onChange={(e) => {
          setAddress({ ...address, street: e.target.value });
        }}
      />
      <TextField
        size="small"
        label="Code postal"
        type="text"
        id="zip"
        value={address.zip}
        onChange={(e) => {
          setAddress({ ...address, zip: e.target.value });
        }}
      />
      <TextField
        size="small"
        label="Ville"
        type="text"
        id="town"
        value={address.town}
        onChange={(e) => {
          setAddress({ ...address, town: e.target.value });
        }}
      />
      <TextField
        size="small"
        label="Pays"
        type="text"
        id="country"
        value={address.country}
        onChange={(e) => {
          setAddress({ ...address, country: e.target.value });
        }}
      />
    </Stack>
  );
}

export default AddressComponent;
