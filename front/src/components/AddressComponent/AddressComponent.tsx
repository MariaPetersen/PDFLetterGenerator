import { Dispatch, SetStateAction } from "react";
import { IAddress } from "../../interfaces/IAddress";
import "./styles.scss";

type AddressComponentProps = {
  address: IAddress;
  setAddress: Dispatch<SetStateAction<IAddress>>;
};

function AddressComponent({ address, setAddress }: AddressComponentProps) {
  return (
    <div className="addressForm__container">
      <label htmlFor="firstName">Prénom</label>
      <input
        type="text"
        id="firstName"
        value={address.firstName}
        onChange={(e) => {
          setAddress({ ...address, firstName: e.target.value });
        }}
      />
      <label htmlFor="lastName">Nom de famille</label>
      <input
        type="text"
        id="lastName"
        value={address.lastName}
        onChange={(e) => {
          setAddress({ ...address, lastName: e.target.value });
        }}
      />
      <label htmlFor="street">Adresse</label>
      <input
        type="text"
        id="street"
        placeholder="31 rue Mouffetard"
        value={address.street}
        onChange={(e) => {
          setAddress({ ...address, street: e.target.value });
        }}
      />
      <label htmlFor="zip">Code postal</label>
      <input
        type="text"
        id="zip"
        value={address.zip}
        onChange={(e) => {
          setAddress({ ...address, zip: e.target.value });
        }}
      />
      <label htmlFor="town">Ville</label>
      <input
        type="text"
        id="town"
        value={address.town}
        onChange={(e) => {
          setAddress({ ...address, town: e.target.value });
        }}
      />
      <label htmlFor="country">Pays</label>
      <input
        type="text"
        id="country"
        value={address.country}
        onChange={(e) => {
          setAddress({ ...address, country: e.target.value });
        }}
      />
    </div>
  );
}

export default AddressComponent;
